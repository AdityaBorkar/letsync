import type {
	ClientDB_Store_Metadata,
	ClientDB_Store_OfflineChanges,
} from '@/types/client-db/stores.js';
import type {
	ClientDB,
	ClientFS,
	ClientPubsub,
	Config,
} from '@/types/index.js';

import { deregister } from '../device/deregister.js';
import { flush } from '../device/flush.js';
import { live } from '../device/live.js';
import { pull } from '../device/pull.js';
import { push } from '../device/push.js';
import { reconcile } from '../device/reconcile.js';
import { register } from '../device/register.js';
import { checkForUpdates } from '../schema/checkForUpdates.js';
import { migrate } from '../schema/migrate.js';
import { metadataHandler } from '../stores/metadata.js';
import { offlineChangesHandler } from '../stores/offlineChanges.js';
import { subscribe } from './addEventListener.js';
import { init as _init } from './init.js';
import { terminate as _terminate } from './terminate.js';

export interface ClientParams {
	db: ClientDB.Adapter<unknown>[];
	fs: ClientFS.Adapter<unknown>[];
	pubsub: ClientPubsub.Adapter;
	config: Config;
	stores: {
		metadata: ClientDB_Store_Metadata;
		offlineChanges: ClientDB_Store_OfflineChanges;
	};
}

export async function createClient<
	DT extends ClientDB.Adapter<unknown>[],
	FS extends ClientFS.Adapter<unknown>[],
	PS extends ClientPubsub.Adapter,
>({
	db,
	fs,
	pubsub,
	config,
	// workers,
}: {
	db: DT;
	fs: FS;
	pubsub: PS;
	config: Config;
	// workers?: boolean;
}) {
	const stores = {
		metadata: metadataHandler({ db, fs, config }),
		offlineChanges: offlineChangesHandler({ db, fs, config }),
	};
	const params = { db, fs, pubsub, config, stores } satisfies ClientParams;

	const init = (props?: Parameters<typeof _init>[0]) => _init(props, params);

	const terminate = (props?: Parameters<typeof _terminate>[0]) =>
		_terminate(props, params);

	const device = {
		register: (props: Parameters<typeof register>[0]) =>
			register(props, params),
		deregister: (props: Parameters<typeof deregister>[0]) =>
			deregister(props, params),
		push: (props: Parameters<typeof push>[0]) => push(props, params),
		pull: (props: Parameters<typeof pull>[0]) => pull(props, params),
		live: (props: Parameters<typeof live>[0]) => live(props, params),
		flush: (props: Parameters<typeof flush>[0]) => flush(props, params),
		reconcile: (props: Parameters<typeof reconcile>[0]) =>
			reconcile(props, params),
	};

	const schema = {
		migrate: (props: Parameters<typeof migrate>[0]) => migrate(props, params),
		checkForUpdates: (props: Parameters<typeof checkForUpdates>[0]) =>
			checkForUpdates(props, params),
	};

	const addEventListener = (props: Parameters<typeof subscribe>[0]) =>
		subscribe(props, params);

	return { init, terminate, device, schema, addEventListener, ...params };
}
