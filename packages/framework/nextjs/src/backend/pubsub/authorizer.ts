import type { Params } from "../handlers.js";

export default async function pubsubAuthorizer(params: Params) {
	const input = await params.request.json();
	const response = await params.pubsub.AuthFn(input.token);
	return new Response(JSON.stringify(response));
}
