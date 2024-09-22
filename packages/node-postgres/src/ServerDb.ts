import type {
	Replocal_ServerDb,
	ReplocalConfig,
	Replocal_PubSub,
} from "@replocal/core";
import type { Client } from "pg";

export function ServerDb({
	pubsub,
	database,
	config,
}: {
	pubsub: Replocal_PubSub;
	database: Client;
	config: ReplocalConfig;
}): Replocal_ServerDb {
	// TODO - Connection Pooling on backend

	return {
		__brand: "REPLOCAL_SERVER_DB",
		type: "SQL",
		database,
		waitUntilReady: async () => {
			try {
				await database.connect();
			} catch (error) {
				console.warn("Connection warning!");
			}
			return true;
		},
		query: (query: string) => database.query(query),
	} as const;
}
