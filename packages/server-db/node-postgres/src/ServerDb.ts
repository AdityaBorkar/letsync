import type {
	Replocal_ServerDb,
	ReplocalConfig,
	Replocal_PubSub,
} from "@replocal/types/lib/index.js";
import type { Client } from "pg";

export function ServerDb({
	database,
	config,
	pubsub,
}: {
	database: Client;
	config: ReplocalConfig;
	pubsub: Replocal_PubSub;
}): Replocal_ServerDb<Client> {
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
		__brand: "REPLOCAL_SERVER_DB",
		type: "SQL",
		database,
		waitUntilReady,
		query: (query: string) => database.query(query),
	};
}
