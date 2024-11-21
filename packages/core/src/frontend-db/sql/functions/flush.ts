import type { Props } from '../index.js';

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface FlushProps {}

export async function flush(props: FlushProps, superProps: Props) {
	// await props.database.sql`DROP DATABASE ${props.config.databaseName}`;
	console.log({ props, superProps });
}
