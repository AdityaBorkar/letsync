import type { Params } from "../../handlers.js";

export default async function changesGet(params: Params) {
	const input = await params.request.json();
	console.log("changesGet REQUEST RECEIVED WITH BODY: ", input);

	const response = {
		ack: true,
	};
	return;
}
