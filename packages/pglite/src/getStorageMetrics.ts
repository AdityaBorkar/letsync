import type { PGlite } from '@electric-sql/pglite';

/**
 * Returns data in MB
 *
 * @param database
 * @returns
 */
export default function getStorageMetrics(database: PGlite) {
	console.log({ database });
	// TDO - RETURN ONLY THE MEMORY CONSUMED BY THIS DATABASE
	return {
		total: 0,
		used: 0,
		free: 0,
	};
}
