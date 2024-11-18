export type Letsync_ServerDB<DT> = {
	__brand: 'LETSYNC_SERVER_DB';
	database: DT;
	waitUntilReady: () => Promise<void>;
} & (
	| {
			type: 'SQL';
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			query: (query: string) => Promise<any>;
	  }
	| {
			type: 'NOSQL';
	  }
);
