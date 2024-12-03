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
	[key: string | '_devices' | '_schema' | '_metadata']: {
		[key: string]: {
			type: 'string' | 'number';
			onCreate?: () => string | number | boolean | Date;
			onUpdate?: () => string | number | boolean | Date;
		};
	};
};
