import type { ClientDB } from '@/types/index.js';
import type { Props } from '../../index.js';

type SubscribeProps = {
	eventName: ClientDB.EventName;
	callback: ClientDB.EventCallbackFn;
};

export async function subscribe(props: SubscribeProps, superProps: Props) {
	// ...
	console.log({ props, superProps });
}
