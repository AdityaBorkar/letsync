import type { server } from '@/server/index.js';

type ApiRouter = typeof server.router;

export async function Fetch<
	MethodType extends keyof ApiRouter,
	EndpointType extends keyof ApiRouter[MethodType],
	// @ts-expect-error
	SearchParamsType extends ApiRouter[MethodType][EndpointType]['searchParams'], // ! THIS DOES NOT WORk
>(props: {
	method: MethodType;
	baseUrl: string;
	endpoint: EndpointType;
	searchParams?: SearchParamsType;
}) {
	const { method, baseUrl, endpoint, searchParams } = props;
	// @ts-expect-error
	const url = `${baseUrl}${endpoint}?${new URLSearchParams(searchParams)}`;
	const response = await fetch(url, { method })
		.then((res) => {
			const data = res.json() as Promise<
				// @ts-expect-error
				ReturnType<ApiRouter[MethodType][EndpointType]>
			>;
			// TODO - zod.parse(data)
			return data;
		})
		.catch((error) => {
			console.error({ error });
			throw error;
		});
	return response;
}
