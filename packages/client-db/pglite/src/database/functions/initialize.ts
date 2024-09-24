import type { PGliteInterface } from "@electric-sql/pglite";

import type { Replocal_Config } from "@replocal/types";

export default async function initialize({
	pg,
	schema,
}: {
	pg: PGliteInterface;
	schema: Replocal_Config["dbSchema"];
}) {
	console.log("Initializing Replocal Sync PGLite Extension");

	// TODO - LastActive, Cursor Position, Typing Indicator

	// TODO - Extend Database Schema according to user's needs
	// TODO - Migrate Schema on (Replocal Schema) update / user's extend needs

	await pg.sql`CREATE TABLE IF NOT EXISTS metadata (
				name TEXT PRIMARY KEY,
				content TEXT NOT NULL,
				lastUpdated TIMESTAMP NOT NULL
			)`.catch((err) => {
		console.error("Error creating `metadata` table: ", err);
	});

	// TODO - Integrate with base schema and discard this:
	await pg.sql`CREATE TABLE IF NOT EXISTS devices (
				deviceId TEXT PRIMARY KEY,
				userId TEXT NOT NULL,
				schemaVersion INTEGER NOT NULL,
				state TEXT
		   )`.catch((err) => {
		console.error("Error creating `devices` table: ", err);
	});

	await pg.sql`CREATE TABLE IF NOT EXISTS schemas (
	    version INTEGER PRIMARY KEY,
	    createdAt TIMESTAMP NOT NULL,
	    schema TEXT NOT NULL
	   )`.catch((err) => {
		console.error("Error creating `schemas` table: ", err);
	});

	await pg.sql`CREATE TABLE IF NOT EXISTS cache (
	    cacheId TEXT PRIMARY KEY,
	    createdAt TIMESTAMP NOT NULL,
	    updatedAt TIMESTAMP NOT NULL,
	    query TEXT NOT NULL,
	    storageUrl TEXT NOT NULL
	   )`.catch((err) => {
		console.error("Error creating `cache` table: ", err);
	});
}
