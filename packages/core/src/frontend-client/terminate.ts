import type { ClientParams } from './create.js';

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface TerminateProps {}

export async function terminate(props: TerminateProps, params: ClientParams) {
	// pubsub.disconnect();
	// database.close();
	// filesystem.close();
	// device.deregister();
	console.log({ props, params });
}
