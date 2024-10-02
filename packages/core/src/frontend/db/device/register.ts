import type { Props } from "./../index.js";
import type { DeviceRecord, PubsubToken } from "@/types/index.js";

import fetcher from "@/frontend/utils/fetcher.js";
import { DeregisterDevices } from "./utils.js";

export async function register(props: Props) {
	// TODO - SET isOnline
	// TODO - REGISTER DEVICE

	const { database, config } = props;
	const apiBaseUrl = config.sync.apiBaseUrl;

	const existingDevices = await database.sql<DeviceRecord[]>(
		`SELECT * FROM metadata WHERE name = 'device'`,
	);
	console.log({ existingDevices });

	if (existingDevices.length === 1) return;
	if (existingDevices.length > 1)
		console.error("Multiple devices found. THIS MUST NOT OCCUR");
	DeregisterDevices({ ...props, devices: existingDevices });

	// if (existingDevice.rows.length === 1) return;
	// if (existingDevice.rows.length > 1)
	// 	console.error("Multiple devices found. THIS MUST NOT OCCUR");
	// DeregisterDevices(existingDevice.rows);

	const data = (await fetcher(`${apiBaseUrl}/device?schema=false`, "POST")) as {
		device: DeviceRecord;
		// schema: SchemaRecord;
		pubsubToken: PubsubToken;
		endpoints: string[];
	};
	if (!data) return;

	const { device, pubsubToken, endpoints } = data;
	const { deviceId, schemaVersion, userId, state } = device;
	await database.sql(
		`INSERT INTO devices (deviceId, userId, schemaVersion, state) VALUES (${deviceId}, ${userId}, ${schemaVersion}, ${state || ""})`,
	);
	await database.sql(
		`INSERT INTO metadata (name, content, lastUpdated) VALUES ('device', ${deviceId}, ${new Date().toISOString()}) ON CONFLICT (name) DO UPDATE SET content = EXCLUDED.content, lastUpdated = EXCLUDED.lastUpdated`,
	);

	const cursor = "";
	await database.sql(
		`INSERT INTO metadata (name, content, lastUpdated) VALUES ('cursor', ${cursor}, ${new Date().toISOString()}) ON CONFLICT (name) DO UPDATE SET content = EXCLUDED.content, lastUpdated = EXCLUDED.lastUpdated`,
	);

	return { deviceId, pubsubToken, endpoints };
}
