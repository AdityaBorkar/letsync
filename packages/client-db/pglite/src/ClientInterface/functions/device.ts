import fetcher from "../utils/fetcher.js";

type DeviceRecord = {
	id: string;
	userId: string;
	schemaVersion: string;
	state: string;
};

// TODO - COMPLETE WITH MANUAL TESTING

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
	DeregisterDevices(existingDevice.rows || []);

	const { device } = await fetcher(`${apiBaseUrl}/device?schema=false`, "POST");
	const { deviceId, schemaVersion, userId, state } = device;
	await pg.sql`INSERT INTO devices (deviceId, userId, schemaVersion, state) VALUES (${deviceId}, ${userId}, ${schemaVersion}, ${state || ""})`;
	await pg.sql`INSERT INTO metadata (name, content, lastUpdated) VALUES ('device', ${deviceId}, ${new Date().toISOString()}) ON CONFLICT (name) DO UPDATE SET content = EXCLUDED.content, lastUpdated = EXCLUDED.lastUpdated`;

	const cursor = "";
	await pg.sql`INSERT INTO metadata (name, content, lastUpdated) VALUES ('cursor', ${cursor}, ${new Date().toISOString()}) ON CONFLICT (name) DO UPDATE SET content = EXCLUDED.content, lastUpdated = EXCLUDED.lastUpdated`;
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

async function DeregisterDevices(devices: { id: string }[]) {
	const pg = globalThis.replocal.db;
	const config = globalThis.replocal.config;
	const apiBaseUrl = config.sync.apiBaseUrl;

	for (const device of devices) {
		await fetcher(`${apiBaseUrl}/device`, "DELETE");
		await pg.sql`DELETE FROM devices WHERE deviceId = ${device.id}`;
	}
}
