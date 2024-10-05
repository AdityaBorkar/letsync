import type { EventName, EventCallbackFn } from "@/types/index.js";
import type { Props } from "../index.js";

type SubscribeProps = {
	eventName: EventName;
	callback: EventCallbackFn;
};

export default async function subscribe(
	props: SubscribeProps,
	superProps: Props,
) {
	// ...
}
