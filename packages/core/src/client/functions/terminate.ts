import type { ClientParams } from './create.js';

type TerminateProps = undefined;

export async function terminate(props: TerminateProps, params: ClientParams) {
	// pubsub.disconnect();
	// database.close();
	// filesystem.close();
	// device.deregister();
	console.log({ props, params });
}
