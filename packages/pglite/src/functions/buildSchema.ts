import type { PGlite } from '@electric-sql/pglite';
import type { Schema } from '@letsync/core';

export async function buildSchema(props: { client: PGlite; schema: Schema }) {
	const { client, schema } = props;

	const ALL_TABLES_SCHEMA = client.sql`SELECT table_name, column_name, data_type, character_maximum_length
                                FROM information_schema.columns
                                WHERE table_schema = 'public'
                                ORDER BY table_name, ordinal_position;`;

	console.log({ ALL_TABLES_SCHEMA });

	for (const tableName in schema) {
		const table = schema[tableName];
		if (!table) continue;

		const fields = Object.entries(table).map(([fieldName, field]) => {
			// TODO - DEFINE TYPE
			return `${fieldName} ${field.type}`;
		});

		const TABLE_SCHEMA = client.sql`SELECT column_name, data_type, character_maximum_length FROM information_schema.columns WHERE table_name = '${tableName}';`;
		if (!TABLE_SCHEMA)
			client.sql`CREATE TABLE IF NOT EXISTS ${tableName} (${fields.join(', ')});`;
		else {
			// TODO - Detect Alterations
			client.sql`ALTER TABLE ${tableName} ADD COLUMN ${fields.join(', ')};`;
		}

		console.log({ TABLE_SCHEMA });
	}

	// TODO - Drop

	// client.sql(
	// 	'CREATE TABLE IF NOT EXISTS schema (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, version INTEGER)',
	// );
}

// CREATE TABLE cars (
//     brand VARCHAR(255),
//     model VARCHAR(255),
//     year INT
//   );

//   SELECT EXISTS (
//     SELECT FROM information_schema.tables
//     WHERE table_schema = 'public'
//     AND table_name = 'your_table_name'
// );
