import type { Config, ClientDB, ClientPubsub } from '@/types/index.js';
import { flush } from './functions/flush.js';
import { close } from './functions/close.js';
import { sql } from './functions/sql.js';
import type { TableRecords } from '@/types/schema/db-schema.js';
import type { ClientDB_MetadataManager } from '@/types/client-db/metadata.js';

interface CreateAdapterConfig extends Config {
	name: string;
	pubsub: ClientPubsub.Adapter;
}

export interface Props {
	schema: string; // TODO
	operations: ClientDB.OperationsAdapter.SQL;
	// apiBaseUrl: string;
	// pubsub: ClientPubsub.Adapter;
	// metadata: ClientDB_MetadataManager;
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
	const { pubsub, name } = config;

	if (pubsub.__brand !== 'LETSYNC_PUBSUB_FRONTEND')
		throw new Error('Invalid pubsub');

	const schema = 'DBSchema(config.dbSchema)'; // TODO - FIX

	// ! WHAT IF METADATA IS STORED IN A DIFFERENT DATABASE?
	// ! HOW TO CREATE NEW SCHEMA?
	// const metadata = {
	// 	async remove(key: string) {
	// 		await operations.sql`DELETE FROM metadata WHERE name = ${key}`;
	// 	},
	// 	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	// 	async upsert(key: string, content: { [key: string]: any }) {
	// 		const contentJson = JSON.stringify(content);
	// 		await operations.sql`INSERT INTO metadata (name, content, lastUpdated) VALUES (${key}, ${contentJson}, ${new Date().toISOString()}) ON CONFLICT (name) DO UPDATE SET content = EXCLUDED.content, lastUpdated = EXCLUDED.lastUpdated`;
	// 	},
	// 	async get(key: string) {
	// 		const record = await operations.sql<
	// 			TableRecords['Metadata']
	// 		>`SELECT * FROM metadata WHERE name = ${key}`;
	// 		// TODO - What if multiple records are found in NoSQL databases?
	// 		const content = record.rows[0]?.content;
	// 		if (!content) return null;
	// 		return JSON.parse(content);
	// 	},
	// } satisfies ClientDB_MetadataManager;

	const props = {
		schema,
		operations,
		// metadata,
		// pubsub,
		// apiBaseUrl,
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
		initialize: () => Promise.resolve(),
	};
}
