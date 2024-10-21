import type { Params } from '@/backend/types.js';

export default async function changesGet(params: Params) {
	const input = await params.request.json();
	console.log('changesGet REQUEST RECEIVED WITH BODY: ', input);

	const response = {
		ack: true,
	};
	return;
}
