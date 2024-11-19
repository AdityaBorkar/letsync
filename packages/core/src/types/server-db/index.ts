export namespace ServerDB {
	export type Adapter<DT> = ServerDB<DT>;
}

type ServerDB<DT> = {
	__brand: 'LETSYNC_SERVER_DB';
	name: string;
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
