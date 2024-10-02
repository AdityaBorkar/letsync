import type { PubsubToken } from "./pubsub.js";

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
export type Letsync_ClientDb<DT extends unknown> = {
	__brand: "LETSYNC_CLIENT_DB";
	database: DT;
	close: () => Promise<void>;
	flush: () => Promise<void>;
	pull: () => Promise<void>;
	push: () => Promise<void>;
	live: (endpoints: string[]) => Promise<void>;
	device: {
		register: () => Promise<
			| undefined
			| {
					deviceId: string;
					pubsubToken: PubsubToken;
					endpoints: string[];
			  }
		>;
		deregister: () => Promise<void>;
	};
	schema: {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		validate: (schema: any) => Promise<void>;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		migrate: (schema: any) => Promise<void>;
		// extend: (schema: any) => void
	};
	event: {
		subscribe: (event: EventName, callback: EventCallbackFn) => Promise<void>;
		unsubscribe: (event: EventName, callback: EventCallbackFn) => Promise<void>;
	};
};

// ---

export interface ClientDbAdapter {
	__brand: "LETSYNC_CLIENT_DATABASE";
	close: () => Promise<void>;
	flush: () => Promise<void>;
	pull: () => Promise<void>;
	push: () => Promise<void>;
	live: (endpoints: string[]) => Promise<void>;
	exportData: () => void;
	storageMetrics: () => void;
	sql: <RT>(...args: string[]) => Promise<RT>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	txn: (tx: any) => void;
	device: {
		deregister: () => Promise<void>;
		register: () => Promise<
			| undefined
			| {
					deviceId: string;
					pubsubToken: PubsubToken;
					endpoints: string[];
			  }
		>;
	};
	schema: {
		getAvailableUpgrades: () => Promise<string[]>;
		migrate: (version: number) => Promise<void>;
	};
	event: {
		subscribe: (event: EventName, callback: EventCallbackFn) => Promise<void>;
		unsubscribe: (event: EventName, callback: EventCallbackFn) => Promise<void>;
	};
}

export interface ClientDb_OpsAdapter {
	sql: <RT>(...args: string[]) => Promise<RT>;
	txn: () => void;
	storageMetrics: () => void;
	exportData: () => void;
	close: () => Promise<void>;
}
