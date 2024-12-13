import type { Schema } from './schema/schema.js';

export type Config = {
	__brand: 'LETSYNC_CONFIG';
	apiBaseUrl: string;
	schema: Schema;
	localDb?: {
		/**
		 * Extends the schema structure for local database
		 * @default '$optimistic'
		 */
		optimisticColumnName?: string;
		updateSchema?: 'always' | 'never';
	};
};
