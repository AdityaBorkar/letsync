import type {
	Letsync_ServerDb,
	Letsync_Config,
	Letsync_PubSub_Backend,
} from "@letsync/core";
import type { Client } from "pg";

export function LetsyncServerDb({
	config,
	pubsub,
	database,
}: {
	pubsub: Letsync_PubSub_Backend;
	config: Letsync_Config;
	database: Client;
}): Letsync_ServerDb<Client> {
	// TODO - Connection Pooling on backend

	// TODO - MIGRATE / SET SCHEMA

	async function waitUntilReady() {
		try {
			await database.connect();
		} catch (error) {
			console.warn("Connection warning!");
		}
	}

	return {
		__brand: "LETSYNC_SERVER_DB",
		type: "SQL",
		database,
		waitUntilReady,
		query: (query: string) => database.query(query),
	};
}
