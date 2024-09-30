import type { Params } from "../handlers.js";

export default async function databaseInit(params: Params) {
	const input = await params.request.json();

	// TODO - CHANGEFEED CREATION AND SCHEMA MIGRATIONS

	console.log("databaseInit REQUEST RECEIVED WITH BODY: ", input);

	const response = {
		ack: true,
	};
}
