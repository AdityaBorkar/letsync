import type { EventName, EventCallbackFn } from '@/types/index.js';
import type { Props } from '../index.js';

type SubscribeProps = {
	eventName: EventName;
	callback: EventCallbackFn;
};

export async function subscribe(props: SubscribeProps, superProps: Props) {
	// ...
	console.log({ props, superProps });
}
