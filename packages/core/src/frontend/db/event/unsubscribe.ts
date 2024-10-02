import type { EventName, EventCallbackFn } from "@/types/index.js";
import type { Props } from "../index.js";

export default async function unsubscribe(
	props: Props & {
		eventName: EventName;
		callback: EventCallbackFn;
	},
) {
	// ...
}
