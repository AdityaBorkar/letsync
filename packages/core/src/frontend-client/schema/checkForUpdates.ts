import TypedFetch from '@/util/TypedFetch.js';
import type { ClientParams } from '../create.js';

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface CheckForUpdatesProps {}

export async function checkForUpdates(
	props: CheckForUpdatesProps,
	params: ClientParams,
) {
	console.log({ props });
	const { metadata, apiBaseUrl } = params;

	const schema = await metadata.get('schema');

	const SchemaVersions = await TypedFetch({
		method: 'GET',
		baseUrl: apiBaseUrl || '',
		endpoint: '/schema/versions',
		searchParams: undefined,
	});

	const upgrades = SchemaVersions.versions
		.reduce((acc, version) => {
			if (version > schema?.version) {
				acc.push(version);
			}
			return acc;
		}, [] as number[])
		.sort((a, b) => a - b);

	// TODO - STORE SCHEMA IN DATABASE

	return upgrades.length > 0;
}
