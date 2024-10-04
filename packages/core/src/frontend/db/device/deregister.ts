import type { DeviceRecord, PubsubToken } from "@/types/index.js";
import fetcher from "@/frontend/utils/fetch.js";
import type { Props } from "../index.js";
import { DeregisterDevices } from "./utils.js";

export async function deregister(props: Props) {
	const { database } = props;

	const devices =
		(await database.sql<DeviceRecord>`SELECT * FROM metadata WHERE name = 'device'`) ||
		[];

	if (devices.rows.length < 1) {
		console.log("No device to deregister");
		return;
	}

	DeregisterDevices({ ...props, devices: devices.rows });
	await database.sql`DELETE FROM metadata WHERE name = 'device'`;
}
