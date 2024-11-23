import type { ApiRouter } from '@/types/server/ApiRouter.js';

export default async function TypedFetch<
	MethodType extends keyof ApiRouter,
	EndpointType extends keyof ApiRouter[MethodType],
	// @ts-expect-error
	SearchParamsType extends ApiRouter[MethodType][EndpointType]['searchParams'],
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
			// TODO - Zod Verify Response
			return res.json() as Promise<
				// @ts-expect-error
				ApiRouter[MethodType][EndpointType]['response']
			>;
		})
		.catch((error) => {
			console.error({ error });
			throw error;
		});
	return response;
}
