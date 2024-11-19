import type { ClientDB, ClientFS, ClientPubsub } from '@/types/index.js';

export async function initClient({
	db: _database,
	fs: _filesystem,
	pubsub: _pubsub,
	workers,
}: {
	db: ClientDB.Adapter<unknown>[];
	fs: ClientFS.Adapter<unknown>[];
	pubsub: ClientPubsub.Adapter;
	workers: boolean;
}) {
	// ! THIS IS THE GENESIS point
	// TODO - RUN BOTH IN SEPARATE SHARED-WORKERS
	// TODO - vALIDATE CONFIG
	if (workers)
		throw new Error('WORKERS ARE CURRENTLY NOT SUPPORTED. WORK IN PROGRESS.');

	// TODO - vALIDATE PIPELINE
	if (!_pubsub || _pubsub.__brand !== 'LETSYNC_PUBSUB_FRONTEND')
		throw new Error(
			`INVALID LETSYNC_PUBSUB. Expected: LETSYNC_PUBSUB_FRONTEND, Found: ${_pubsub.__brand}`,
		);

	// TODO - vALIDATE DATABASE
	for (const db of _database) {
		if (!db || db.__brand !== 'LETSYNC_CLIENT_DATABASE')
			throw new Error(
				`INVALID LETSYNC_CLIENT_DATABASE. Expected: LETSYNC_CLIENT_DATABASE, Found: ${db.__brand}`,
			);
	}

	const database = _database[0];
	if (!database) throw new Error('No database found');
	const device = await database.device.register();

	const onInitUpgradeSchemaToLatest = true;
	const schemaUpgrades = await database.schema.getAvailableUpgrades();
	if (schemaUpgrades.length > 0 && onInitUpgradeSchemaToLatest) {
		const latestSchema = schemaUpgrades[schemaUpgrades.length - 1];
		if (!latestSchema) throw new Error('Error fetching latest schema');
		await database.schema.migrate(latestSchema);
	}

	const pubsub = await _pubsub.connect({
		clientId: device?.device.deviceId || '',
		token: device?.pubsub.token || '',
	});

	// const ON_INIT_PUSH_AUTOMATICALLY = true;
	// if (ON_INIT_PUSH_AUTOMATICALLY) await database.push();

	// const ON_INIT_PULL_AUTOMATICALLY = true;
	// if (ON_INIT_PULL_AUTOMATICALLY) await database.pull();

	// const ON_INIT_LIVE_AUTOMATICALLY = true;
	// if (ON_INIT_LIVE_AUTOMATICALLY) {
	// 	await database.live(device?.pubsub.endpoints || [""]);
	// }

	return {
		pubsub,
		db: [database],
		fs: [],
		close: () => {
			pubsub.disconnect();
			database.close();
		},
	};
}
