import { Params } from "../handlers.js";

export default async function deviceUnregister(params: Params) {
	const input = await params.request.json();
	console.log("deviceUnregister REQUEST RECEIVED WITH BODY: ", input);

	const response = { ack: true };
}
