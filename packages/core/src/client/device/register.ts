import { Console } from '@/util/Console.js';
import { Fetch } from '@/util/Fetch.js';
import type { ClientParams } from '../functions/create.js';

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface RegisterProps {
	// TODO - ADD METADATA for { organizationId, projectId }
}

export async function register(props: RegisterProps, params: ClientParams) {
	props;
	const { debug } = Console({ fn: 'register' });

	const { apiUrl } = params.config;
	const { metadata } = params.stores;

	const existingDevice = await metadata.get('device');
	debug({ existingDevice });

	const data =
		//  existingDevice
		// 	? await Fetch({
		// 			method: 'GET',
		// 			baseUrl: apiUrl,
		// 			endpoint: '/device',
		// 			searchParams: { deviceId: existingDevice.deviceId },
		// 		})
		// 	:
		await Fetch({
			method: 'POST',
			baseUrl: apiUrl,
			endpoint: '/device',
		});
	debug({ data });

	// @ts-ignore
	const { device, schema, pubsub } = data;
	const { deviceId, userId, isActive } = device;

	if (!isActive) {
		throw new Error('Device was forcefully logged out');
	}

	await metadata.upsert('device', { userId, deviceId });
	await metadata.upsert('cursor', { location: null });
	await metadata.upsert('schema', schema);

	return { deviceId, userId, isActive, pubsub };
}
