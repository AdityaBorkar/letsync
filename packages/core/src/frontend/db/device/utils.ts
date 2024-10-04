import fetcher from "@/frontend/utils/fetch.js";
import type { Props } from "../index.js";
import type { DeviceRecord } from "@/types/db-schema.js";

export async function validate(props: Props) {
	const { database, config } = props;
	const apiBaseUrl = config.sync.apiBaseUrl;

	const existingDevice =
		await database.sql<DeviceRecord>`SELECT * FROM metadata WHERE name = 'device'`;

	// TODO - CHECK IF DEVICE WAS LOGGED OUT FROM THE SERVER
}

export async function DeregisterDevices(
	props: Props & {
		devices: { deviceId: string }[];
	},
) {
	const { database, config } = props;
	const apiBaseUrl = config.sync.apiBaseUrl;

	for (const { deviceId } of props.devices) {
		await fetcher(`${apiBaseUrl}/device`, "DELETE");
		await database.sql`DELETE FROM devices WHERE deviceId = ${deviceId}`;
	}
}
