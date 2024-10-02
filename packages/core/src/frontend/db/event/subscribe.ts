import type { EventName, EventCallbackFn } from "@/types/index.js";
import type { Props } from "../index.js";

export default async function subscribe(
	props: Props & {
		eventName: EventName;
		callback: EventCallbackFn;
	},
) {
	// ...
}
