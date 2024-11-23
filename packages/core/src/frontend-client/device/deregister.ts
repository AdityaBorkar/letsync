import TypedFetch from '@/util/TypedFetch.js';
import type { ClientParams } from '../functions/create.js';
import { Console } from '@/util/Console.js';

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface DeregisterProps {
	// TODO - DE-REGISTER OTHER DEVICES
}

export async function deregister(props: DeregisterProps, params: ClientParams) {
	props;
	const { debug } = Console({ fn: 'deregister' });

	const { metadata } = params.stores;
	const { apiBaseUrl } = params.config;

	const existingDevice = await metadata.get('device');
	debug({ existingDevice });

	const data = await TypedFetch({
		method: 'DELETE',
		baseUrl: apiBaseUrl || '',
		endpoint: '/device',
		searchParams: { deviceId: existingDevice?.deviceId },
	});
	debug({ data });

	if (!data.success) {
		throw new Error('Failed to deregister device');
	}

	await metadata.remove('device');
}
