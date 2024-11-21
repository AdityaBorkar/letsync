import type { ClientParams } from '../create.js';
import type { Client } from '@/types/client/index.js';

type UnsubscribeProps = {
	eventName: Client.EventName;
	callback: Client.EventCallbackFn;
};

export async function unsubscribe(
	props: UnsubscribeProps,
	params: ClientParams,
) {
	// ...
	console.log({ props, params });
}
