import type {
	Replocal_ServerDb,
	Replocal_Config,
	Replocal_PubSub_Backend,
} from "@replocal/types";
import type { Client } from "pg";

export function ReplocalServerDb({
	config,
	pubsub,
	database,
}: {
	pubsub: Replocal_PubSub_Backend;
	config: Replocal_Config;
	database: Client;
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
