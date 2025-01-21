import { Console } from '@/util/Console.js';
import { Fetch } from '@/util/Fetch.js';
import type { ClientParams } from '../functions/create.js';

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface DeregisterProps {
	// TODO - DE-REGISTER OTHER DEVICES
}

export async function deregister(props: DeregisterProps, params: ClientParams) {
	props;
	const { debug } = Console({ fn: 'deregister' });

	const { metadata } = params.stores;
	const { apiUrl } = params.config;

	const existingDevice = await metadata.get('device');
	debug({ existingDevice });

	const data = await Fetch({
		method: 'DELETE',
		baseUrl: apiUrl || '',
		endpoint: '/device',
		searchParams: { deviceId: existingDevice?.deviceId },
	});
	debug({ data });

	if (!data.ack) {
		throw new Error('Failed to deregister device');
	}

	await metadata.remove('device');
}
