import type {
	ClientDbAdapter,
	Letsync_PubSub_Frontend as PubsubAdapter,
} from '@/types/index.js';

export default async function initialize({
	workers,
	pubsub: _pubsub,
	database: _database,
}: {
	workers: boolean;
	pubsub: PubsubAdapter;
	database: ClientDbAdapter;
}) {
	// TODO - RUN BOTH IN SEPARATE SHARED-WORKERS
	if (workers)
		throw new Error('WORKERS ARE CURRENTLY NOT SUPPORTED. WORK IN PROGRESS.');

	if (!_pubsub || _pubsub.__brand !== 'LETSYNC_PUBSUB_FRONTEND')
		throw new Error(
			`INVALID LETSYNC_PUBSUB. Expected: LETSYNC_PUBSUB_FRONTEND, Found: ${_pubsub.__brand}`,
		);

	const database = _database;
	if (!database || database.__brand !== 'LETSYNC_CLIENT_DATABASE')
		throw new Error(
			`INVALID LETSYNC_CLIENT_DATABASE. Expected: LETSYNC_CLIENT_DATABASE, Found: ${database.__brand}`,
		);

	const device = await database.device.register();

	const onInitUpgradeSchemaToLatest = true;
	const schemaUpgrades = await database.schema.getAvailableUpgrades();
	if (schemaUpgrades.length > 0 && onInitUpgradeSchemaToLatest) {
		const latestSchema = schemaUpgrades[schemaUpgrades.length - 1];
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
		database,
		close: () => {
			pubsub.disconnect();
			database.close();
		},
	};
}
