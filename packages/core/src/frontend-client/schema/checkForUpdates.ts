import TypedFetch from '@/util/TypedFetch.js';
import type { ClientParams } from '../functions/create.js';
import { Console } from '@/util/Console.js';

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface CheckForUpdatesProps {}

export async function checkForUpdates(
	props: CheckForUpdatesProps,
	params: ClientParams,
) {
	props;
	const { debug } = Console({ fn: 'checkForUpdates' });

	const { stores } = params;
	const { metadata } = stores;
	const { apiBaseUrl } = params.config;

	const schema = await metadata.get('schema');
	debug({ schema });

	const SchemaVersions = await TypedFetch({
		method: 'GET',
		baseUrl: apiBaseUrl || '',
		endpoint: '/schema/versions',
	});
	debug({ SchemaVersions });

	// TODO - STORE SCHEMA IN DATABASE

	const upgrades = SchemaVersions.versions
		.reduce((acc, version) => {
			if (version > schema?.version) {
				acc.push(version);
			}
			return acc;
		}, [] as number[])
		.sort((a, b) => a - b);

	return upgrades.length > 0;
}
