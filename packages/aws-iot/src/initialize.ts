// @ts-expect-error
import type { Resource } from "sst/aws";

export default function InitializeInfra(Resource: Resource) {
	return { handler: (token: string) => handler(token, Resource) };
}

function handler(token: string, Resource: Resource) {
	const prefix = `${Resource.App.name}/${Resource.App.stage}`;

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
