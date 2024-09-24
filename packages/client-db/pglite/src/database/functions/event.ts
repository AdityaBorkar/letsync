import type { EventName, EventCallbackFn } from "@replocal/types";

const event = { subscribe, unsubscribe };
export default event;

async function subscribe(eventName: EventName, callback: EventCallbackFn) {}

async function unsubscribe(eventName: EventName, callback: EventCallbackFn) {}
