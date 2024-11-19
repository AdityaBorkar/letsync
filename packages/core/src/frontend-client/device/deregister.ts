import type { Props } from '../../frontend-db/sql/index.js';
import TypedFetch from '@/frontend-db/common/TypedFetch.js';

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface DeregisterProps {
	// TODO - DE-REGISTER OTHER DEVICES
}

export async function deregister(props: DeregisterProps, superProps: Props) {
	console.log({ props });
	const { metadata, apiBaseUrl } = superProps;

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
