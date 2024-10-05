import type { Props as SuperProps } from "../index.js";
import TypedFetch from "@/frontend-db/utils/TypedFetch.js";

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface RegisterProps {
	// TODO - ADD METADATA for { organizationId, projectId }
}

export async function register(props: RegisterProps, superProps: SuperProps) {
	const { metadata, apiBaseUrl } = superProps;

	const existingDevice = await metadata.get("device");

	const data = existingDevice
		? await TypedFetch({
				method: "GET",
				baseUrl: apiBaseUrl,
				endpoint: "/device",
				searchParams: { deviceId: existingDevice.deviceId },
			})
		: await TypedFetch({
				method: "POST",
				baseUrl: apiBaseUrl,
				endpoint: "/device",
				searchParams: undefined,
			});

	const { device, schema, pubsub } = data;
	const { deviceId, userId, isActive } = device;

	if (!isActive) throw new Error("Device was forcefully logged out");

	await metadata.upsert("device", { userId, deviceId });
	await metadata.upsert("cursor", { location: null });
	await metadata.upsert("schema", schema);

	return { device, pubsub };
}
