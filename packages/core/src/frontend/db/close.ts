import type { Props } from "./index.js";

export default async function close(props: Props) {
	await props.database.close();

	// TODO - PUBSUB ANNOUNCE

	// TODO - PUBSUB CLOSE CONNECTIONS
	// TODO - SET LastActive AS TRIGGER ON PUBSUB CLOSE CONNECTIONS
}
