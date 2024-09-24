export default function PubSub_Authorizer({ prefix }: { prefix: string }): (
	token: string,
) => Promise<{
	publish: string[];
	subscribe: string[];
}> {
	return async (token: string) => {
		// TODO - DO AUTHENTICATION with `token`
		console.log({ token });

		if (!token) {
			// TODO: How to reject request?
			return { subscribe: [], publish: [] };
		}

		const topics = ["vasundhara-aakash"];

		return {
			publish: [], // [`${prefix}/replocal/${topic}`],
			subscribe: topics.map((topic) => `${prefix}/replocal/${topic}`),
		};
	};
}
