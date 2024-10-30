import type { Params } from '../types.js';

export default async function cacheRetrieve(params: Params) {
	const input = await params.request.json();
	console.log('cacheRetrieve REQUEST RECEIVED WITH BODY: ', params);
	console.log('cacheRetrieve REQUEST RECEIVED WITH BODY: ', input);

	const response = {
		ack: true,
	};
	return response;
}
