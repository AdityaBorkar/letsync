import type { Params } from '../types.js';

export default async function cacheRetrieve(params: Params) {
	const input = await params.request.json();
	console.log('cacheRetrieve REQUEST RECEIVED WITH BODY: ', params);

	const response = {
		ack: true,
	};
}
