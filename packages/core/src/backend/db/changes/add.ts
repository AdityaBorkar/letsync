import type { Params } from '@/backend/types.js';

export default async function changesAdd(params: Params) {
	const input = await params.request.json();
	console.log('changesAdd REQUEST RECEIVED WITH BODY: ', input);

	const response = {
		ack: true,
	};
	return response;
}
