import type { Config, ServerDB, ServerPubsub } from '@letsync/core';
import type { Client } from 'pg';

export function LetsyncServerDb({
	name,
	// pubsub,
	// dbSchema,
	database,
}: {
	name: string;
	pubsub: ServerPubsub.Adapter;
	schema: Config['schema'];
	database: Client;
	// | (() => {
	// 		instance: Client;
	// 		wrapper: any;
	//   });
}): ServerDB.Adapter<Client> {
	// TODO - Connection Pooling on backend

	// TODO - MIGRATE / SET SCHEMA

	async function waitUntilReady() {
		try {
			await database.connect();
		} catch (error) {
			console.warn('Connection warning!');
		}
	}

	return {
		__brand: 'LETSYNC_SERVER_DB',
		name,
		type: 'SQL',
		database,
		waitUntilReady,
		query: (query: string) => database.query(query),
	};
}
