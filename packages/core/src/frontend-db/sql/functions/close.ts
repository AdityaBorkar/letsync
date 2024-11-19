import type { Props } from '../index.js';

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface CloseProps {}

export async function close(props: CloseProps, superProps: Props) {
	const { operations, pubsub } = superProps;
	await operations.close();

	console.log({ props, pubsub });
	// TODO - PUBSUB ANNOUNCE
	// TODO - SET LastActive AS TRIGGER ON PUBSUB CLOSE CONNECTIONS

	// pubsub.close(); // if no database / connections are there. outsource to pubsub module
}
