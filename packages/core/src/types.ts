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
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		validate: (schema: any) => void;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		migrate: (schema: any) => void;
		// extend: (schema: any) => void
	};
	pull: () => void;
	push: () => void;
	live: (userGroup: string) => void;
};

export type Replocal_ServerDb =
	| {
			__brand: "REPLOCAL_SERVER_DB";
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			database: any;
			waitUntilReady: () => Promise<boolean>;
			type: "SQL";
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			query: (query: string) => Promise<any>;
	  }
	| {
			__brand: "REPLOCAL_SERVER_DB";
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			database: any;
			waitUntilReady: () => Promise<boolean>;
			type: "NOSQL";
	  };

export type Replocal_PubSub = {
	__brand: "REPLOCAL_PUBSUB";
	publish: (
		userGroup: string,
		payload: {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			[key: string]: any;
		},
	) => Promise<void>;
	subscribe: (
		userGroup: string,
		callback: (message: string) => void,
	) => Promise<void>;
};
