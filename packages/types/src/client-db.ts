const events = [
	"auth.grant",
	"auth.refresh",
	"auth.revoke",
	"devices.register",
	"devices.deregister",
	"devices.pull",
	"devices.push",
	"devices.sync",
];

export type EventName = "device:register" | "device:deregister";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type EventCallbackFn = (data: any) => void;

// biome-ignore lint/complexity/noUselessTypeConstraint: <explanation>
export type Replocal_ClientDb<DT extends unknown> = {
	__brand: "REPLOCAL_CLIENT_DB";
	database: DT;
	event: {
		subscribe: (event: EventName, callback: EventCallbackFn) => Promise<void>;
		unsubscribe: (event: EventName, callback: EventCallbackFn) => Promise<void>;
	};
	device: {
		register: () => Promise<void>;
		deregister: () => Promise<void>;
	};
	flush: () => Promise<void>;
	schema: {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		validate: (schema: any) => Promise<void>;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		migrate: (schema: any) => Promise<void>;
		// extend: (schema: any) => void
	};
	pull: () => Promise<void>;
	push: () => Promise<void>;
	live: () => Promise<void>;
	close: () => Promise<void>;
};
