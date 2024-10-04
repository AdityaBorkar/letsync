import type { Props as SuperProps } from "./../index.js";
import type { DeviceRecord, PubsubToken } from "@/types/index.js";
import type { Metadata, TableRecords } from "@/types/db-schema.js";

import fetcher from "@/frontend/utils/fetch.js";
import { DeregisterDevices } from "./utils.js";

interface RegisterProps {
	userId: string;
}

export async function register(props: RegisterProps, superProps: SuperProps) {
	// TODO - SET isOnline
	// TODO - REGISTER DEVICE

	const { database, config } = superProps;
	const apiBaseUrl = config.sync.apiBaseUrl;

	try {
		const AllDevices = await database.sql<
			TableRecords["Metadata"]
		>`SELECT * FROM metadata WHERE name = 'device'`;

		const UserDevices = AllDevices.rows
			.map((device) => {
				const data = JSON.parse(device.content) as Metadata["Device"];
				if (data.userId === props.userId) return data;
				return undefined;
			})
			.filter((device) => device !== undefined);

		if (UserDevices.length > 1) {
			console.error("Multiple devices found. THIS MUST NOT OCCUR");
			DeregisterDevices({ devices: UserDevices }, superProps);
		}
	} catch (error) {
		console.error(error);
	}
	// if (existingDevice.rows.length === 1) return;
	// if (existingDevice.rows.length > 1)
	// 	console.error("Multiple devices found. THIS MUST NOT OCCUR");
	// DeregisterDevices(existingDevice.rows);

	const data = await fetcher({
		method: "POST",
		baseUrl: apiBaseUrl,
		endpoint: "/device",
		searchParams: {
			schema: "false",
		},
	});
	if (!data) return;

	const { device, pubsubToken, endpoints } = data;
	const { deviceId, schemaVersion, userId, state } = device;
	const cursor = "";

	await database.sql`INSERT INTO metadata (name, content, lastUpdated) VALUES ('device', ${deviceId}, ${new Date().toISOString()}) ON CONFLICT (name) DO UPDATE SET content = EXCLUDED.content, lastUpdated = EXCLUDED.lastUpdated`;
	await database.sql`INSERT INTO metadata (name, content, lastUpdated) VALUES ('cursor', ${cursor}, ${new Date().toISOString()}) ON CONFLICT (name) DO UPDATE SET content = EXCLUDED.content, lastUpdated = EXCLUDED.lastUpdated`;

	// await database.sql`INSERT INTO devices (deviceId, userId, schemaVersion, state) VALUES (${deviceId}, ${userId}, ${schemaVersion}, ${state || ""})`;

	return { deviceId, pubsubToken, endpoints };
}
