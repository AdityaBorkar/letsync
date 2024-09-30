import type { Params } from "../../handlers.js";

export default async function changesStatus(params: Params) {
	const input = await params.request.json();
	console.log("changesStatus REQUEST RECEIVED WITH BODY: ", input);

	const response = {
		ack: true,
	};
}
