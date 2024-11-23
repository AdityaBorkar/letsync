import type { ClientDBAdapter } from './adapter.js';

export namespace ClientDB {
	export type Adapter<DBClient> = ClientDBAdapter<DBClient>;
}
