import TypedFetch from '@/util/TypedFetch.js';
import type { ClientParams } from '../create.js';

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface DeregisterProps {
	// TODO - DE-REGISTER OTHER DEVICES
}

export async function deregister(props: DeregisterProps, params: ClientParams) {
	console.log({ props });
	const { metadata, apiBaseUrl } = params;

	const existingDevice = await metadata.get('device');

	const data = await TypedFetch({
		method: 'DELETE',
		baseUrl: apiBaseUrl || '',
		endpoint: '/device',
		searchParams: { deviceId: existingDevice?.deviceId },
	});

	if (!data.success) {
		throw new Error('Failed to deregister device');
	}

	await metadata.remove('device');
}
