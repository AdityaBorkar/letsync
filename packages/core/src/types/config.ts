export type Letsync_Config = {
	sync: {
		apiBaseUrl: string;
		auth: () => {
			authorized: true;
			provider: string;
			endpoints: string[];
		};
	};
	localDb?: {
		/**
		 * Extends the schema structure for local database
		 * @default '$optimistic'
		 */
		optimisticColumnName?: string;
	};
	dbSchema: {
		[key: string | "devices" | "schemas" | "cache"]: string;
	};
};
