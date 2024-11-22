import type { Config, ClientDB, ClientPubsub } from '@/types/index.js';
import { sql } from './functions/sql.js';

interface CreateAdapterConfig extends Config {
	name: string;
	pubsub: ClientPubsub.Adapter;
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

	return {
		__brand: 'LETSYNC_CLIENT_DATABASE',
		name,
		client,
		init: operations.init,
		close: operations.close,
		flush: operations.flush,
		exportData: operations.exportData,
		storageMetrics: operations.storageMetrics,
		sql: (...params: Parameters<typeof sql>) =>
			// TODO - ADD OPTION TO SUBSCRIBE, TO READ OPTIMISTIC OR NOT
			sql(params, {
				schema,
				operations,
			}), // TODO - Support Typescript
		onChange,
	};
}

// TABLE = DO NOT ALLOW DIRECT CHANGES TO TABLES
// TABLE = ALLOW OPTIMISTIC CHANGES

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
