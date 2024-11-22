import type {
	ClientDB,
	ClientFS,
	ClientPubsub,
	Config,
} from '@/types/index.js';
import { register } from './device/register.js';
import { deregister } from './device/deregister.js';
import { push } from './sync/push.js';
import { pull } from './sync/pull.js';
import { live } from './sync/live.js';
import { subscribe } from './addEventListener.js';
import { init as _init } from './init.js';
import { terminate as _terminate } from './terminate.js';
import { migrate } from './schema/migrate.js';
import { checkForUpdates } from './schema/checkForUpdates.js';

export interface ClientParams {
	db: ClientDB.Adapter<unknown>[];
	fs: ClientFS.Adapter<unknown>[];
	pubsub: ClientPubsub.Adapter;
	config: Config;
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
	// workers: boolean;
}) {
	// Validation:

	// TODO - VALIDATE CONFIG

	// if (workers) {
	// 	// RUN BOTH IN SEPARATE SHARED-WORKERS
	// 	throw new Error('We currently do not support workers.');
	// }

	if (pubsub?.__brand !== 'LETSYNC_PUBSUB_FRONTEND')
		throw new Error(
			`Invalid PubSub Adapter. Expected: LETSYNC_PUBSUB_FRONTEND, Found: ${pubsub.__brand}`,
		);

	for (const filesystem of fs) {
		if (filesystem?.__brand !== 'LETSYNC_CLIENT_FILESYSTEM')
			throw new Error(
				`Invalid Filesystem Adapter. Expected: LETSYNC_CLIENT_FILESYSTEM, Found: ${filesystem.__brand}`,
			);
		await filesystem.initialize();
	}

	for (const database of db) {
		if (database?.__brand !== 'LETSYNC_CLIENT_DATABASE')
			throw new Error(
				`Invalid Database Adapter. Expected: LETSYNC_CLIENT_DATABASE, Found: ${database.__brand}`,
			);
		await database.initialize();
	}

	// API:

	const params = { db, fs, pubsub, config } satisfies ClientParams;

	const init = (props: Parameters<typeof _init>[0]) => _init(props, params);

	const terminate = (props: Parameters<typeof _terminate>[0]) =>
		_terminate(props, params);

	const device = {
		register: (props: Parameters<typeof register>[0]) =>
			register(props, params),
		deregister: (props: Parameters<typeof deregister>[0]) =>
			deregister(props, params),
		push: (props: Parameters<typeof push>[0]) => push(props, params),
		pull: (props: Parameters<typeof pull>[0]) => pull(props, params),
		live: (props: Parameters<typeof live>[0]) => live(props, params),
		// reconcile: (props: Parameters<typeof reconcile>[0]) =>
		// 	reconcile(props, params),
		// flush: (props: Parameters<typeof flush>[0]) => flush(props, params),
	};

	const schema = {
		migrate: (props: Parameters<typeof migrate>[0]) => migrate(props, params),
		checkForUpdates: (props: Parameters<typeof checkForUpdates>[0]) =>
			checkForUpdates(props, params),
	};

	const addEventListener = (props: Parameters<typeof subscribe>[0]) =>
		subscribe(props, params); // TODO - RETURN UNSUBSCRIBE FUNCTION

	return { init, terminate, device, schema, addEventListener, ...params };
}

// DATABASE RELATED FEATURES:
// subscribe()
// write()
// read()
// delete()
