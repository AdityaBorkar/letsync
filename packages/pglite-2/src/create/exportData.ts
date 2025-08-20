import type { PGlite } from '@electric-sql/pglite';
// import type { Schema } from '@letsync/core';
type Schema = null;

/**
 * Exports data from the given database with the specified compression method.
 *
 * @param {PGlite} client - The database instance to export data from.
 * @param {'auto' | 'gzip' | 'none'} compression - The compression method to use for the export.
 *
 * @returns {Promise<File | Blob>} A promise that resolves to a File or Blob containing the exported data.
 */
export default function exportData(
	props: { client: PGlite; schema: Schema | null },
	options: { compression: 'auto' | 'gzip' | 'none' },
): Promise<File | Blob> {
	const { client } = props;
	const { compression } = options;
	return client.dumpDataDir(compression);
}
