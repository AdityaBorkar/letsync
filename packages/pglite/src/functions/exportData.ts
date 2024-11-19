import type { PGlite } from '@electric-sql/pglite';

/**
 * Exports data from the given database with the specified compression method.
 *
 * @param {'auto' | 'gzip' | 'none'} compression - The compression method to use for the export.
 * @param {PGlite} database - The database instance to export data from.
 * @returns {Promise<File | Blob>} A promise that resolves to a File or Blob containing the exported data.
 */
export default function exportData(
	compression: 'auto' | 'gzip' | 'none',
	database: PGlite,
): Promise<File | Blob> {
	return database.dumpDataDir(compression);
}
