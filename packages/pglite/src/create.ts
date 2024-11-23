import type { ClientDB, ClientPubsub, Config } from '@letsync/core';
import { PGlite, type PGliteOptions } from '@electric-sql/pglite';

import exportData from './functions/exportData.js';
import getStorageMetrics from './functions/getStorageMetrics.js';
import { init } from './functions/init.js';
import { flush } from './functions/flush.js';
import { close } from './functions/close.js';
import { sql } from './functions/sql.js';

interface InitConfig extends Config {
	name: string;
	pubsub: ClientPubsub.Adapter;
}

export function createClientDB(
	props: PGlite | PGliteOptions,
	config: InitConfig,
): ClientDB.Adapter<PGlite> {
	const client = props instanceof PGlite ? props : new PGlite(props);

	if (config.pubsub.__brand !== 'LETSYNC_PUBSUB_FRONTEND')
		throw new Error(
			`Invalid PubSub Adapter. Expected: LETSYNC_PUBSUB_FRONTEND, Found: ${config.pubsub.__brand}`,
		);

	const schema = 'DBSchema(config.dbSchema)'; // TODO - FIX

	return {
		__brand: 'LETSYNC_CLIENT_DATABASE',
		name: config.name,
		client,
		// onChange,
		init: () => init(client),
		flush: () => flush(client),
		close: () => close(client),
		sql: <T>(...props: Parameters<typeof client.sql>) =>
			sql<T>({ client, schema }, ...props),
		storageMetrics: () => getStorageMetrics(client),
		exportData: (props: Parameters<typeof exportData>[0]) =>
			exportData(props, client),
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
