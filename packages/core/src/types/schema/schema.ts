export interface TableRecords {
	Metadata: {
		name: string;
		content: string;
		lastUpdated: string;
	};
}

// export interface Metadata {
// 	Device: {
// 		deviceId: string;
// 		userId: string;
// 		schemaVersion: string;
// 		state: string;
// 	};
// }

export type Schema = {
	[key: string | 'devices' | 'schemas' | 'cache']: TableRecords;
};