import type {
	Replocal_ClientDb,
	Replocal_PubSub_Frontend,
} from "@replocal/types";
import type { Connected_Replocal_PubSub } from "./provider.js";

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
} satisfies Connected_Replocal_PubSub;

// biome-ignore lint/complexity/noUselessTypeConstraint: <explanation>
export default async function initialize<DT extends unknown>({
	workers,
	pubsub: _pubsub,
	database: _database,
}: {
	workers: boolean;
	pubsub: Replocal_PubSub_Frontend;
	database: Promise<Replocal_ClientDb<DT>>;
}) {
	// TODO - RUN BOTH IN SEPARATE SHARED-WORKERS
	if (workers)
		throw new Error("WORKERS ARE CURRENTLY NOT SUPPORTED. WORK IN PROGRESS.");

	if (!_pubsub || _pubsub.__brand !== "REPLOCAL_PUBSUB_FRONTEND")
		throw new Error("INVALID REPLOCAL_PUBSUB");

	const database = await _database;
	if (!database || database.__brand !== "REPLOCAL_CLIENT_DB")
		throw new Error("INVALID REPLOCAL_CLIENT_DB");

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
