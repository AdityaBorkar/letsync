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
] as const;

export type EventName = (typeof events)[number];

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type EventCallbackFn = (data: any) => void;

// ---

export interface ClientDb_OpsAdapter {
	txn: Method_Txn;
	sql: Method_Sql;
	query: Method_Query;
	close: () => Promise<void>;
	exportData: Method_ExportData;
	storageMetrics: Method_StorageMetrics;
}

export interface ClientDbAdapter {
	__brand: "LETSYNC_CLIENT_DATABASE";
	sql: Method_Sql;
	// txn: Method_Txn;
	// query: Method_Query;
	exportData: Method_ExportData;
	storageMetrics: Method_StorageMetrics;
	close: () => Promise<void>;
	flush: () => Promise<void>;
	pull: () => Promise<void>;
	push: () => Promise<void>;
	live: (endpoints: string[]) => Promise<void>;
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

// ---

type Method_Sql = <RT>(
	sqlStrings: TemplateStringsArray,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	...params: any[]
) => Promise<Results<RT>>;

type Method_Query = <RT>(
	query: string,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	params?: any[],
	// options?: QueryOptions,
) => Promise<Results<RT>>;

interface Transaction {
	sql: Method_Sql;
	query: Method_Query;
	// exec(query: string, options?: QueryOptions): Promise<Array<Results>>;
	rollback(): Promise<void>;
	get closed(): boolean;
}

type Method_Txn = <T>(
	callback: (tx: Transaction) => Promise<Results<T>>,
) => Promise<Results<T> | undefined>;

type Method_ExportData = (
	compression: "none" | "gzip" | "auto",
) => Promise<File | Blob>;

type Method_StorageMetrics = () => void;

// ---

type Row<
	T = {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		[key: string]: any;
	},
> = T;

type Results<T> = {
	rows: Row<T>[];
	affectedRows?: number;
	fields: {
		name: string;
		dataTypeID: number;
	}[];
	blob?: Blob;
};
