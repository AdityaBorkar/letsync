// export interface TableRecords {
// 	Metadata: {
// 		name: string;
// 		content: string;
// 		lastUpdated: string;
// 	};
// }

// export interface Metadata {
// 	Device: {
// 		deviceId: string;
// 		userId: string;
// 		schemaVersion: string;
// 		state: string;
// 	};
// }

export type Schema = {
	// '$devices' | '$schema' | '$metadata'
	[key: string]: {
		[key: string]: {
			type: 'string' | 'number';
			onCreate?: () => string | number | boolean | Date;
			onUpdate?: () => string | number | boolean | Date;
		};
	};
};
