import type { ClientDB } from '@/types/index.js';
import type { Props } from '../../index.js';

type UnsubscribeProps = {
	eventName: ClientDB.EventName;
	callback: ClientDB.EventCallbackFn;
};

export async function unsubscribe(props: UnsubscribeProps, superProps: Props) {
	// ...
	console.log({ props, superProps });
}
