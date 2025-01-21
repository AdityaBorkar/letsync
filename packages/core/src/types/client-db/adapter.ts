export interface ClientDBAdapter<DBClient> {
	__brand: 'LETSYNC_CLIENT_DATABASE';
	client: DBClient;
	name: string;
	open: () => Promise<void>;
	close: () => Promise<void>;
	flush: () => Promise<void>;
	buildSchema: (schema: null) => Promise<void>;
	sql: MethodSql;
	exportData: MethodExportData;
	storageMetrics: MethodStorageMetrics;
}

type MethodSql = <RT>(
	sqlStrings: TemplateStringsArray,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	...params: any[]
) => Promise<Results<RT>>;

// type MethodQuery = <RT>(
// 	query: string,
// 	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
// 	params?: any[],
// 	// options?: QueryOptions,
// ) => Promise<Results<RT>>;

// interface Transaction {
// 	sql: MethodSql;
// 	query: MethodQuery;
// 	// exec(query: string, options?: QueryOptions): Promise<Array<Results>>;
// 	rollback(): Promise<void>;
// 	get closed(): boolean;
// }

// type MethodTxn = <T>(
// 	callback: (tx: Transaction) => Promise<Results<T>>,
// ) => Promise<Results<T> | undefined>;

type MethodExportData = (options: {
	compression: 'none' | 'gzip' | 'auto';
}) => Promise<File | Blob>;

type MethodStorageMetrics = () => void;

type Row<
	T = {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		[key: string]: any;
	},
> = T;

type Results<T> = {
	rows: Row<T>[];
	affectedRows?: number;
	fields: {
		name: string;
		dataTypeID: number;
	}[];
	blob?: Blob;
};
