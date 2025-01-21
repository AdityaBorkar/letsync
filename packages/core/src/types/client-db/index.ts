import type { Config } from '../config.js';
import type { ClientPubsub } from '../pubsub/index.js';
import type { ClientDBAdapter } from './adapter.js';

export namespace ClientDB {
	export type Adapter<DBClient> = ClientDBAdapter<DBClient>;

	export type CreateAdapter<DBClient> = (props: {
		pubsub: ClientPubsub.Adapter;
		config: Config;
	}) => ClientDB.Adapter<DBClient>;
}
