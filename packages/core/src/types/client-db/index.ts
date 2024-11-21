import type {
	ClientDBAdapter,
	ClientDB_NoSQLOperationsAdapter,
	ClientDB_SQLOperationsAdapter,
} from './adapter.js';

export namespace ClientDB {
	export type Adapter<DBClient> = ClientDBAdapter<DBClient>;

	export namespace OperationsAdapter {
		export type SQL = ClientDB_SQLOperationsAdapter;
		export type NoSQL = ClientDB_NoSQLOperationsAdapter;
	}
}
