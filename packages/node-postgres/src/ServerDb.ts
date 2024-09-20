import type { Client } from "pg";

export function ServerDb(database: Client, config: any) {
	// TODO - Connection Pooling on backend

	return database;
}
