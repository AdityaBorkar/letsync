import type {
	ClientDBAdapter,
	ClientDB_NoSQLOperationsAdapter,
	ClientDB_SQLOperationsAdapter,
} from './adapter.js';

import type * as Events from './events.js';

export namespace ClientDB {
	export type Adapter<DBClient> = ClientDBAdapter<DBClient>;

	export namespace OperationsAdapter {
		export type SQL = ClientDB_SQLOperationsAdapter;
		export type NoSQL = ClientDB_NoSQLOperationsAdapter;
	}

	export type EventName = Events.EventName;
	export type EventCallbackFn = Events.EventCallbackFn;
}
