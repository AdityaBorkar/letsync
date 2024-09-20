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

export type EventName = "device:register" | "device:deregister";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type EventCallbackFn = (data: any) => void;

export type Replocal_ClientDb = {
	__brand: "REPLOCAL_CLIENT_DB";
	database: any;
	waitUntilReady: () => Promise<boolean>;
	event: {
		subscribe: (event: EventName, callback: EventCallbackFn) => void;
		unsubscribe: (event: EventName, callback: EventCallbackFn) => void;
	};
	device: {
		register: () => void;
		deregister: () => void;
	};
	flush: () => void;
	schema: {
		validate: (schema: any) => void;
		migrate: (schema: any) => void;
		// extend: (schema: any) => void
	};
	pull: () => void;
	push: () => void;
	live: () => void;
};

export type Replocal_ServerDb =
	| {
			__brand: "REPLOCAL_SERVER_DB";
			database: any;
			waitUntilReady: () => Promise<boolean>;
			type: "SQL";
			query: (query: string) => Promise<any>;
	  }
	| {
			__brand: "REPLOCAL_SERVER_DB";
			database: any;
			waitUntilReady: () => Promise<boolean>;
			type: "NOSQL";
	  };
