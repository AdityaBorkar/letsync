import fetcher from "../common/fetcher.js";
import type { PGliteWithReplocal } from "./index.js";

export async function register(pg: PGliteWithReplocal) {
	const apiBaseUrl = pg.replocal.config.sync.apiBaseUrl;

	const existingDevice =
		(await pg.sql`SELECT * FROM metadata WHERE name = 'device'`) as {
			rows: any[];
		};
	if (existingDevice.rows.length === 1) return;
	if (existingDevice.rows.length > 1)
		console.error("Multiple devices found. THIS MUST NOT OCCUR");
	DeregisterDevices(existingDevice.rows || [], pg, apiBaseUrl);

	const { device, schema } = await fetcher(`${apiBaseUrl}/device`, "POST");

	// TODO - STORE `schema`

	const { deviceId, schemaVersion, userId, state } = device;
	await pg.sql`INSERT INTO devices (deviceId, userId, schemaVersion, state) VALUES (${deviceId}, ${userId}, ${schemaVersion}, ${state || ""})`;
	await pg.sql`INSERT INTO metadata (name, content, lastUpdated) VALUES ('device', ${deviceId}, ${new Date().toISOString()}) ON CONFLICT (name) DO UPDATE SET content = EXCLUDED.content, lastUpdated = EXCLUDED.lastUpdated`;
}

export async function deregister(pg: PGliteWithReplocal) {
	const apiBaseUrl = pg.replocal.config.sync.apiBaseUrl;

	const existingDevice =
		(await pg.sql`SELECT * FROM metadata WHERE name = 'device'`) as {
			rows: any[];
		};

	if (existingDevice.rows.length < 1) {
		console.log("No device to deregister");
		return;
	}

	DeregisterDevices(existingDevice.rows || [], pg, apiBaseUrl);
	await pg.sql`DELETE FROM metadata WHERE name = 'device'`;
}

async function DeregisterDevices(
	devices: { id: string }[],
	pg: any,
	apiBaseUrl: string,
) {
	for (const device of devices) {
		await fetcher(`${apiBaseUrl}/device`, "DELETE");
		await pg.sql`DELETE FROM devices WHERE deviceId = ${device.id}`;
	}
}
