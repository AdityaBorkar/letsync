import type { PGlite } from '@electric-sql/pglite';
import type { Schema } from '@letsync/core';

export async function buildSchema(props: { client: PGlite; schema: Schema }) {
	const { client, schema } = props;

	for (const tableName in schema) {
		const table = schema[tableName];
		console.log({ table, client });
		// client.sql(
		// 	`CREATE TABLE IF NOT EXISTS ${name} (${columns.map((column) => `${column.name} ${column.type}`).join(', ')})`,
		// );
	}

	// client.sql(
	// 	'CREATE TABLE IF NOT EXISTS schema (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, version INTEGER)',
	// );
}
