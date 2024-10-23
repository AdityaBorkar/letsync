import type { Params } from '../types.js';

export default async function cacheUpsert(params: Params) {
	const input = await params.request.json();
	console.log('cacheUpsert REQUEST RECEIVED WITH BODY: ', input);

	const response = {
		ack: true,
	};
	return response;
}
