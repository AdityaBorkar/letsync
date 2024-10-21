// import type { PubsubToken } from "./pubsub.js";

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

// ---

export interface ClientDb_OpsAdapter {
	txn: MethodTxn;
	sql: MethodSql;
	query: MethodQuery;
	close: () => Promise<void>;
	exportData: MethodExportData;
	storageMetrics: MethodStorageMetrics;
}

export interface ClientDbAdapter {
	__brand: 'LETSYNC_CLIENT_DATABASE';
	sql: MethodSql;
	// txn: Method_Txn;
	// query: Method_Query;
	exportData: MethodExportData;
	storageMetrics: MethodStorageMetrics;
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
					device: {
						userId: string;
						deviceId: string;
						isActive: boolean;
					};
					pubsub: {
						token: string;
						endpoints: string[];
					};
			  }
		>;
	};
	schema: {
		getAvailableUpgrades: () => Promise<number[]>;
		migrate: (version: number) => Promise<void>;
	};
	event: {
		subscribe: (event: EventName, callback: EventCallbackFn) => Promise<void>;
		unsubscribe: (event: EventName, callback: EventCallbackFn) => Promise<void>;
	};
}

// ---

type MethodSql = <RT>(
	sqlStrings: TemplateStringsArray,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	...params: any[]
) => Promise<Results<RT>>;

type MethodQuery = <RT>(
	query: string,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	params?: any[],
	// options?: QueryOptions,
) => Promise<Results<RT>>;

interface Transaction {
	sql: MethodSql;
	query: MethodQuery;
	// exec(query: string, options?: QueryOptions): Promise<Array<Results>>;
	rollback(): Promise<void>;
	get closed(): boolean;
}

type MethodTxn = <T>(
	callback: (tx: Transaction) => Promise<Results<T>>,
) => Promise<Results<T> | undefined>;

type MethodExportData = (
	compression: 'none' | 'gzip' | 'auto',
) => Promise<File | Blob>;

type MethodStorageMetrics = () => void;

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
