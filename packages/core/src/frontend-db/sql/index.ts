import type { Config, ClientDB, ClientPubsub } from '@/types/index.js';
import { flush } from './functions/flush.js';
import { pull } from '../../frontend-client/sync/pull.js';
import { push } from '../../frontend-client/sync/push.js';
import { live } from '../../frontend-client/sync/live.js';
import { close } from './functions/close.js';
import { register } from '../../frontend-client/device/register.js';
import { deregister } from '../../frontend-client/device/deregister.js';
import { subscribe } from '../../frontend-client/event/subscribe.js';
import { unsubscribe } from '../../frontend-client/event/unsubscribe.js';
import { sql } from './functions/sql.js';
import { migrate } from './schema/migrate.js';
import { getAvailableUpgrades } from './schema/getAvailableUpgrades.js';
import type { TableRecords } from '@/types/db-schema.js';
import type { ClientDB_MetadataManager } from '@/types/client-db/metadata.js';

interface CreateAdapterConfig extends Config {
	name: string;
	pubsub: ClientPubsub.Adapter;
}

export interface Props {
	schema: string; // TODO
	apiBaseUrl: string;
	pubsub: ClientPubsub.Adapter;
	metadata: ClientDB_MetadataManager;
	operations: ClientDB.OperationsAdapter.SQL;
}

export function createAdapter_ClientDB_SQL<DBClient>({
	client,
	config,
	operations,
}: {
	client: DBClient;
	config: CreateAdapterConfig;
	operations: ClientDB.OperationsAdapter.SQL;
}): ClientDB.Adapter<DBClient> {
	const { pubsub, apiBaseUrl, name } = config;

	if (pubsub.__brand !== 'LETSYNC_PUBSUB_FRONTEND')
		throw new Error('Invalid pubsub');
	if (!apiBaseUrl) throw new Error('Invalid apiBaseUrl'); // TODO - Ping Check

	const schema = 'DBSchema(config.dbSchema)'; // TODO - FIX

	const metadata = {
		async remove(key: string) {
			await operations.sql`DELETE FROM metadata WHERE name = ${key}`;
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		async upsert(key: string, content: { [key: string]: any }) {
			const contentJson = JSON.stringify(content);
			await operations.sql`INSERT INTO metadata (name, content, lastUpdated) VALUES (${key}, ${contentJson}, ${new Date().toISOString()}) ON CONFLICT (name) DO UPDATE SET content = EXCLUDED.content, lastUpdated = EXCLUDED.lastUpdated`;
		},
		async get(key: string) {
			const record = await operations.sql<
				TableRecords['Metadata']
			>`SELECT * FROM metadata WHERE name = ${key}`;
			// TODO - What if multiple records are found in NoSQL databases?
			const content = record.rows[0]?.content;
			if (!content) return null;
			return JSON.parse(content);
		},
	} satisfies ClientDB_MetadataManager;

	const props = {
		pubsub,
		schema,
		metadata,
		operations,
		apiBaseUrl,
	} satisfies Props;

	return {
		__brand: 'LETSYNC_CLIENT_DATABASE',
		name,
		client,
		exportData: operations.exportData,
		storageMetrics: operations.storageMetrics,
		sql: (...params: Parameters<typeof sql>) => sql(params, props),
		// query: (query: string) => query(query, Props),
		// txn: (tx: any) => txn({ tx, ...Props }),
		close: () => close({}, props),
		flush: () => flush({}, props),
		// pull: () => pull({}, props),
		// push: () => push({}, props),
		// live: (endpoints: string[]) => live({ endpoints }, props),
		// device: {
		// 	register: () => register({}, props),
		// 	deregister: () => deregister({}, props),
		// },
		// event: {
		// 	subscribe: (
		// 		eventName: ClientDB.EventName,
		// 		callback: ClientDB.EventCallbackFn,
		// 	) => subscribe({ eventName, callback }, props),
		// 	unsubscribe: (
		// 		eventName: ClientDB.EventName,
		// 		callback: ClientDB.EventCallbackFn,
		// 	) => unsubscribe({ eventName, callback }, props),
		// },
		schema: {
			migrate: (version: number) => migrate({ version }, props),
			getAvailableUpgrades: () => getAvailableUpgrades(undefined, props),
		},
	};
}
