import { Params } from "../handlers.js";

export default async function deviceInfo(params: Params) {
	const input = await params.request.json();
	console.log("deviceInfo REQUEST RECEIVED WITH BODY: ", input);

	const response = {
		ack: true,
	};
}
