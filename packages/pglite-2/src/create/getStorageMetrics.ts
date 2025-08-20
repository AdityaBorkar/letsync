import type { PGlite } from '@electric-sql/pglite';

interface DatabaseSizeRecord {
	total_mb: number;
	used_mb: number;
	free_mb: number;
}

/**
 * Returns data in MB
 *
 * @param database
 * @returns
 */
export default async function getStorageMetrics(database: PGlite) {
	// Get the total size of all tables in the database
	// TODO - Correct typescript support
	const result = await database.sql<DatabaseSizeRecord>`
		SELECT 
			pg_database_size(current_database()) / (1024.0 * 1024.0) as total_mb,
			pg_database_size(current_database()) / (1024.0 * 1024.0) as used_mb,
			0 as free_mb
	`;

	const metrics = result.rows[0];
	console.log({ metrics });

	return {
		total: Number(metrics?.total_mb || 0),
		used: Number(metrics?.used_mb || 0),
		free: 0,
	};
}
