import { deregister } from "./device/deregister.js";
import type { Props } from "./index.js";

export default async function flush(props: Props) {
	await deregister(props);
	await props.database.sql`DROP DATABASE ${props.config.databaseName}`;
}
