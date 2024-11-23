import type { ClientPubsub } from '../pubsub/index.js';
import type { Schema } from '../schema/schema.js';
import type { ClientDBAdapter } from './adapter.js';

export namespace ClientDB {
	export type Adapter<DBClient> = ClientDBAdapter<DBClient>;

	export type CreateAdapter<DBClient> = (props: {
		pubsub: ClientPubsub.Adapter;
		schema: Schema;
	}) => ClientDB.Adapter<DBClient>;
}
