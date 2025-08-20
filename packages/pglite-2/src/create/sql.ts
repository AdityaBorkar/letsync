import type { PGlite } from '@electric-sql/pglite';
// import type { Schema } from '@letsync/core';
type Schema = null;

interface Params {
	client: PGlite;
	schema: Schema | null;
}

export function sql<T>(
	params: Params,
	...props: Parameters<typeof params.client.sql>
) {
	const { client, schema } = params;

	// TODO - ADD OPTION TO SUBSCRIBE, TO READ OPTIMISTIC OR NOT
	// TODO - Support Typescript
	console.log({ schema });

	// TODO - validate schema
	// TODO - add to database (optimistic) (and inform subscribers)
	// TODO - IF OFFLINE add to offlineChanges
	// TODO - IF ONLINE send to server & add to localChanges

	// after pull / live acknowledges the creation. it's converted to a live change.

	return client.sql<T>(...props);
}

// interface Params {
// 	schema: string;
// 	// operations: ClientDB.OperationsAdapter.SQL;
// }

// // biome-ignore lint/suspicious/noExplicitAny: <explanation>
// export function sql<ReturnType>(props: any, params: Params) {
// 	console.log({ params, props });

// 	// TODO -
// 	// GRANT UPDATE ON dbo.tblTest(f1,f3) TO user1;
// 	// DENY UPDATE ON dbo.tblTest(f2 ) TO user1;

// 	// TODO - IMPLEMENT DATABASE SCHEMA PROTECTION RULES (OR ACCESS CONTROL RULES)

// 	return 'OK' as unknown as ReturnType; // database.sql(query);
// }

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
