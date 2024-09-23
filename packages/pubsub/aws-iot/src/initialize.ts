import type { Resource, RealtimeAuthResult } from "sst";

export default function InitializeInfra(Resource: Resource) {
	return { handler: (token: string) => handler(token, Resource) };
}

async function handler(
	token: string,
	Resource: Resource,
): Promise<RealtimeAuthResult> {
	const prefix = `${Resource.App.name}/${Resource.App.stage}`;

	console.log({ token });

	// TODO - DO AUTHENTICATION with `token`
	// if (token) {
	// 	// TODO: How to reject request?
	// 	return { subscribe: [], publish: [] };
	// }
	const userGroup = "vasundhara-aakash";

	return {
		subscribe: [`${prefix}/${userGroup}/replocal`],
		publish: [`${prefix}/${userGroup}/replocal`],
	};
}
