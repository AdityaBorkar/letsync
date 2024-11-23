export type Config = {
	__brand: 'LETSYNC_CONFIG';
	apiBaseUrl: string;
	localDb?: {
		/**
		 * Extends the schema structure for local database
		 * @default '$optimistic'
		 */
		optimisticColumnName?: string;
	};
	dbSchema: {
		[key: string | 'devices' | 'schemas' | 'cache']: string;
	};
	updateSchema?: 'always' | 'never';
};
