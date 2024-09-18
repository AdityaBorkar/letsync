import type { PGliteInterface } from "@electric-sql/pglite";

import type { ReplocalConfig } from "@replocal/core";

export default async function initDb(options: {
	pg: PGliteInterface;
	schema: ReplocalConfig["dbSchema"];
}) {
	const { pg, schema } = options;

	// TODO - LastActive, Cursor Position, Typing Indicator

	// TODO - Extend Database Schema according to user's needs
	// TODO - Migrate Schema on (Replocal Schema) update / user's extend needs

	await pg
		.query(
			`CREATE TABLE IF NOT EXISTS metadata (
				name TEXT PRIMARY KEY,
				content TEXT NOT NULL,
				lastUpdated TIMESTAMP NOT NULL
			)`,
		)
		.catch((err) => {
			console.error("Error creating `metadata` table: ", err);
		});

	// TODO - Integrate with base schema and discard this:
	await pg
		.query(
			`CREATE TABLE IF NOT EXISTS devices (
				deviceId TEXT PRIMARY KEY,
				userId TEXT NOT NULL,
				schemaVersion INTEGER NOT NULL,
				state TEXT
		   )`,
		)
		.catch((err) => {
			console.error("Error creating `devices` table: ", err);
		});
	await pg
		.query(
			`CREATE TABLE IF NOT EXISTS schemas (
        version INTEGER PRIMARY KEY,
        createdAt TIMESTAMP NOT NULL,
        schema TEXT NOT NULL
       )`,
		)
		.catch((err) => {
			console.error("Error creating `schemas` table: ", err);
		});
	await pg
		.query(
			`CREATE TABLE IF NOT EXISTS cache (
        cacheId TEXT PRIMARY KEY,
        createdAt TIMESTAMP NOT NULL,
        updatedAt TIMESTAMP NOT NULL,
        query TEXT NOT NULL,
        storageUrl TEXT NOT NULL
       )`,
		)
		.catch((err) => {
			console.error("Error creating `cache` table: ", err);
		});
}
