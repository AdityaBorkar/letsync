import type {
	ClientDbAdapter,
	Letsync_PubSub_Frontend as PubsubAdapter,
} from "@/types/index.js";

export default async function initialize({
	workers,
	pubsub: _pubsub,
	database: _database,
}: {
	workers: boolean;
	pubsub: PubsubAdapter;
	database: Promise<ClientDbAdapter>;
}) {
	// TODO - RUN BOTH IN SEPARATE SHARED-WORKERS
	if (workers)
		throw new Error("WORKERS ARE CURRENTLY NOT SUPPORTED. WORK IN PROGRESS.");

	if (!_pubsub || _pubsub.__brand !== "LETSYNC_PUBSUB_FRONTEND")
		throw new Error("INVALID LETSYNC_PUBSUB");

	const database = await _database;
	if (!database || database.__brand !== "LETSYNC_CLIENT_DATABASE")
		throw new Error("INVALID LETSYNC_CLIENT_DB");

	const data = await database.device.register();
	if (!data)
		return {
			database,
			pubsub: pubsubSpoof,
			close: () => {
				database.close();
			},
		};
	const { deviceId, pubsubToken, endpoints } = data;
	const pubsub = await _pubsub.connect({
		clientId: deviceId,
		token: pubsubToken.value,
	});
	await database.push();
	await database.pull();
	await database.live(endpoints);

	return {
		pubsub,
		database,
		close: () => {
			pubsub.disconnect();
			database.close();
		},
	};
}

const pubsubSpoof = {
	async publish() {
		console.error("Client not connected!");
		return;
	},
	async subscribe() {
		console.error("Client not connected!");
		return;
	},
	async disconnect() {
		console.error("Client not connected!");
		return;
	},
} satisfies Awaited<ReturnType<PubsubAdapter["connect"]>>;
