import type { Params } from '../types.js';

export default async function cacheDelete(params: Params) {
	const input = await params.request.json();
	console.log('cacheDelete REQUEST RECEIVED WITH BODY: ', input);

	const response = { ack: true };
	return response;
}
