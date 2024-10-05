import { deregister } from "./device/deregister.js";
import type { Props } from "./index.js";

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface FlushProps {}

export default async function flush(props: FlushProps, superProps: Props) {
	// await props.database.sql`DROP DATABASE ${props.config.databaseName}`;
}
