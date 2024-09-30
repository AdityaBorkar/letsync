import type { Params } from "../../handlers.js";

export default async function changesAdd(params: Params) {
	const input = await params.request.json();
	console.log("changesAdd REQUEST RECEIVED WITH BODY: ", input);

	const response = {
		ack: true,
	};
}
