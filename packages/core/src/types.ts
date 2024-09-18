export type ReplocalConfig = {
	sync: {
		apiBaseUrl: string;
		auth: "cookies";
		method: "mqtt"; // |"webhooks" | "longpoll" | "sse";
	};
	dbSchema: {
		devices?: string;
		schemas?: string;
		cache?: string;
	};
	localDb: {
		/**
		 * Extends the schema structure for local database
		 * @default '$optimistic'
		 */
		optimisticColumnName: string;
	};
	iaac: {
		provider: "sst";
		serverDb?: () => void;
		cacheStore?: () => void;
	};
};

export type Replocal_ClientDb = {
	database: any;
	waitUntilReady: () => Promise<boolean>;
	events: {
		subscribe: (event: string, callback: (data: any) => void) => void;
		unsubscribe: (event: string, callback: (data: any) => void) => void;
	};
	device: {
		register: () => void;
		deregister: () => void;
	};
	schema: {
		validate: (schema: any) => void;
		migrate: (schema: any) => void;
		// extend: (schema: any) => void
	};
	pull: () => void;
	push: () => void;
	sync: () => void;
};

export type Replocal_ServerDb = {};
