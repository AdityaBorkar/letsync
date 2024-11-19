const events = [
	'auth.grant',
	'auth.refresh',
	'auth.revoke',
	'devices.register',
	'devices.deregister',
	'devices.pull',
	'devices.push',
	'devices.sync',
] as const;

export type EventName = (typeof events)[number];

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type EventCallbackFn = (data: any) => void;
