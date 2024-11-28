import type { Client } from '@/types/client/index.js';
import type { ClientParams } from './create.js';

type SubscribeProps = {
	eventName: Client.EventName;
	callback: Client.EventCallbackFn;
};

export async function subscribe(props: SubscribeProps, params: ClientParams) {
	// ...
	console.log({ props, params });

	const unsubscribe = () => {};

	return unsubscribe;
}
