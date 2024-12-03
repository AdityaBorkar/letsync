import type { PGlite } from '@electric-sql/pglite';
import type { Schema } from '@letsync/core';

/**
 * Exports data from the given database with the specified compression method.
 *
 * @param {'auto' | 'gzip' | 'none'} compression - The compression method to use for the export.
 * @param {PGlite} client - The database instance to export data from.
 * @returns {Promise<File | Blob>} A promise that resolves to a File or Blob containing the exported data.
 */
export default function exportData(
	props: { client: PGlite; schema: Schema },
	options: { compression: 'auto' | 'gzip' | 'none' },
): Promise<File | Blob> {
	const { client } = props;
	const { compression } = options;
	return client.dumpDataDir(compression);
}
