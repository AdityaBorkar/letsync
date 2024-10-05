import type { Props } from "./index.js";

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface CloseProps {}

export default async function close(props: CloseProps, superProps: Props) {
	const { database } = superProps;
	await database.close();

	// TODO - PUBSUB ANNOUNCE

	// TODO - PUBSUB CLOSE CONNECTIONS
	// TODO - SET LastActive AS TRIGGER ON PUBSUB CLOSE CONNECTIONS
}
