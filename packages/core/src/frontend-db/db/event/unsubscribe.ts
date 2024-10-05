import type { EventName, EventCallbackFn } from "@/types/index.js";
import type { Props } from "../index.js";

type UnsubscribeProps = {
	eventName: EventName;
	callback: EventCallbackFn;
};

export default async function unsubscribe(
	props: UnsubscribeProps,
	superProps: Props,
) {
	// ...
}
