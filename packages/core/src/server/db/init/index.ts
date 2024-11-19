import type { Params } from '@/server/types.js';

export default async function databaseInit(params: Params) {
	const input = await params.request.json();

	// TODO - CHANGEFEED CREATION AND SCHEMA MIGRATIONS

	console.log('databaseInit REQUEST RECEIVED WITH BODY: ', input);

	const response = { ack: true };
	return response;
}
