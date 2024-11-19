import type {
	Letsync_ServerDB,
	Config,
	Letsync_PubSub_Backend,
} from '@letsync/core';
import type { Client } from 'pg';

export function LetsyncServerDb({
	name,
	// pubsub,
	// dbSchema,
	database,
}: {
	name: string;
	pubsub: Letsync_PubSub_Backend;
	dbSchema: Config['dbSchema'];
	database: Client;
	// | (() => {
	// 		instance: Client;
	// 		wrapper: any;
	//   });
}): Letsync_ServerDB<Client> {
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
