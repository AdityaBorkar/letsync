import type { EventName, EventCallbackFn } from "@replocal/core";

const event = { subscribe, unsubscribe };
export default event;

function subscribe(eventName: EventName, callback: EventCallbackFn) {}

function unsubscribe(eventName: EventName, callback: EventCallbackFn) {}
