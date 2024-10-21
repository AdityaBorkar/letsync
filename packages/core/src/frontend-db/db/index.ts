import type {
	Config,
	ClientDbAdapter,
	ClientDb_OpsAdapter,
	Letsync_PubSub_Frontend as PubsubAdapter,
	EventName,
	EventCallbackFn,
} from '@/types/index.js';
import { flush } from './flush.js';
import { pull } from './pull.js';
import { push } from './push.js';
import { live } from './live.js';
import { close } from './close.js';
import { register } from './device/register.js';
import { deregister } from './device/deregister.js';
import { subscribe } from './event/subscribe.js';
import { unsubscribe } from './event/unsubscribe.js';
import { sql } from './sql.js';
import migrate from './schema/migrate.js';
import getAvailableUpgrades from './schema/getAvailableUpgrades.js';
import type { TableRecords } from '@/types/db-schema.js';

export type Props = {
	name: string;
	database: ClientDb_OpsAdapter;
	metadata: {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		upsert: (name: string, content: { [key: string]: any }) => void;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		get: (name: string) => Promise<{ [key: string]: any }>;
		remove: (name: string) => void;
	};
	pubsub: PubsubAdapter;
	apiBaseUrl: string;
	dbSchema: Config['dbSchema'];
};

export default function clientDb(props: {
	apiBaseUrl: string;
	pubsub: PubsubAdapter;
	dbSchema: Config['dbSchema'];
	dbOpsAdapter: ClientDb_OpsAdapter;
}): Omit<ClientDbAdapter, 'database' | '__brand'> {
	const { dbOpsAdapter: database, pubsub, dbSchema, apiBaseUrl } = props;

	if (pubsub.__brand !== 'LETSYNC_PUBSUB_FRONTEND')
		throw new Error('Invalid pubsub');

	const { storageMetrics, exportData } = database;

	const MetadataManager = {
		remove(name: string) {
			return database.sql`DELETE FROM metadata WHERE name = ${name}`;
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		upsert(name: string, content: { [key: string]: any }) {
			const contentJson = JSON.stringify(content);
			return database.sql`INSERT INTO metadata (name, content, lastUpdated) VALUES (${name}, ${contentJson}, ${new Date().toISOString()}) ON CONFLICT (name) DO UPDATE SET content = EXCLUDED.content, lastUpdated = EXCLUDED.lastUpdated`;
		},
		async get(name: string) {
			const record = await database.sql<
				TableRecords['Metadata']
			>`SELECT * FROM metadata WHERE name = ${name}`;
			// TODO - What if multiple records are found in NoSQL databases?
			const content = record.rows[0].content;
			return JSON.parse(content);
		},
	} satisfies Props['metadata'];

	const superProps = {
		name: 'SET THIS',
		metadata: MetadataManager,
		database,
		pubsub,
		dbSchema,
		apiBaseUrl,
	} satisfies Props;

	return {
		exportData,
		storageMetrics,
		sql: (...params: Parameters<typeof sql>) => sql(params, superProps),
		// query: (query: string) => query(query, Props),
		// txn: (tx: any) => txn({ tx, ...Props }),
		close: () => close({}, superProps),
		flush: () => flush({}, superProps),
		pull: () => pull({}, superProps),
		push: () => push({}, superProps),
		live: (endpoints: string[]) => live({ endpoints }, superProps),
		device: {
			register: () => register({}, superProps),
			deregister: () => deregister({}, superProps),
		},
		event: {
			subscribe: (eventName: EventName, callback: EventCallbackFn) =>
				subscribe({ eventName, callback }, superProps),
			unsubscribe: (eventName: EventName, callback: EventCallbackFn) =>
				unsubscribe({ eventName, callback }, superProps),
		},
		schema: {
			migrate: (version: number) => migrate({ version }, superProps),
			getAvailableUpgrades: () => getAvailableUpgrades(undefined, superProps),
		},
	};
}

// TODO - REPLACE NAMES WITH ARCHITECTURE DESIGN PATTERNS
