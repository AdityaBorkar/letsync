import type { DeviceRecord, PubsubToken } from "@replocal/types";
import fetcher from "../utils/fetcher.js";

const device = { validate, register, deregister };
export default device;

async function validate() {
	const pg = globalThis.replocal.db;
	const config = globalThis.replocal.config;
	const apiBaseUrl = config.sync.apiBaseUrl;

	const existingDevice =
		await pg.sql<DeviceRecord>`SELECT * FROM metadata WHERE name = 'device'`;

	// TODO - CHECK IF DEVICE WAS LOGGED OUT FROM THE SERVER
}

async function register() {
	const pg = globalThis.replocal.db;
	const config = globalThis.replocal.config;
	const apiBaseUrl = config.sync.apiBaseUrl;

	const existingDevice =
		await pg.sql<DeviceRecord>`SELECT * FROM metadata WHERE name = 'device'`;
	console.log({ existingDevice });

	if (existingDevice.rows.length === 1) return;
	if (existingDevice.rows.length > 1)
		console.error("Multiple devices found. THIS MUST NOT OCCUR");
	DeregisterDevices(existingDevice.rows);

	const data = (await fetcher(`${apiBaseUrl}/device?schema=false`, "POST")) as {
		device: DeviceRecord;
		// schema: SchemaRecord;
		pubsubToken: PubsubToken;
		endpoints: string[];
	};
	if (!data) return;

	const { device, pubsubToken, endpoints } = data;
	const { deviceId, schemaVersion, userId, state } = device;
	await pg.sql`INSERT INTO devices (deviceId, userId, schemaVersion, state) VALUES (${deviceId}, ${userId}, ${schemaVersion}, ${state || ""})`;
	await pg.sql`INSERT INTO metadata (name, content, lastUpdated) VALUES ('device', ${deviceId}, ${new Date().toISOString()}) ON CONFLICT (name) DO UPDATE SET content = EXCLUDED.content, lastUpdated = EXCLUDED.lastUpdated`;

	const cursor = "";
	await pg.sql`INSERT INTO metadata (name, content, lastUpdated) VALUES ('cursor', ${cursor}, ${new Date().toISOString()}) ON CONFLICT (name) DO UPDATE SET content = EXCLUDED.content, lastUpdated = EXCLUDED.lastUpdated`;

	return { deviceId, pubsubToken, endpoints };
}

async function deregister() {
	const pg = globalThis.replocal.db;

	const existingDevice =
		await pg.sql<DeviceRecord>`SELECT * FROM metadata WHERE name = 'device'`;

	if (existingDevice.rows.length < 1) {
		console.log("No device to deregister");
		return;
	}

	DeregisterDevices(existingDevice.rows || []);
	await pg.sql`DELETE FROM metadata WHERE name = 'device'`;
}

// * Utils:

async function DeregisterDevices(devices: { deviceId: string }[]) {
	const pg = globalThis.replocal.db;
	const config = globalThis.replocal.config;
	const apiBaseUrl = config.sync.apiBaseUrl;

	for (const { deviceId } of devices) {
		await fetcher(`${apiBaseUrl}/device`, "DELETE");
		await pg.sql`DELETE FROM devices WHERE deviceId = ${deviceId}`;
	}
}
