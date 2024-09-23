import type {
	EventName,
	EventCallbackFn,
} from "../../../../../types/lib/index.js";

const event = { subscribe, unsubscribe };
export default event;

function subscribe(eventName: EventName, callback: EventCallbackFn) {}

function unsubscribe(eventName: EventName, callback: EventCallbackFn) {}
