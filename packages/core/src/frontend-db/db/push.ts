import type { Props } from "./index.js";

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface PushProps {}

export default async function push(props: PushProps, superProps: Props) {
	// TODO - (WRITE LOCK) ENABLE
	// TODO - PUSH WRITE REQUESTS
	// TODO - COLLECT ERRORS (DO NOT DO ANYTHING WITH THEM FOR NOW)
	// TODO - (WRITE LOCK) RELEASE
}
