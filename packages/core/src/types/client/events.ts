const events = [
	'auth.grant',
	'auth.refresh',
	'auth.revoke',
	'device.register',
	'device.deregister',
	'device:connected',
	'device:disconnected',
	'^pull', // TODO: regex
	'^push', // TODO: regex
	'^sync', // TODO: regex
] as const;

export type EventName = (typeof events)[number];

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type EventCallbackFn = (data: any) => void;
