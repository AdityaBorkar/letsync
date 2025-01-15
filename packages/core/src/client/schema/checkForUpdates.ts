import { Console } from '@/util/Console.js';
import { Fetch } from '@/util/Fetch.js';
import type { ClientParams } from '../functions/create.js';

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
	const { apiUrl } = params.config;

	const schema = await metadata.get('schema');
	debug({ schema });

	const SchemaVersions = await Fetch({
		method: 'GET',
		baseUrl: apiUrl || '',
		endpoint: '/schema',
	});
	console.log({ SchemaVersions });
	debug({ SchemaVersions });

	// TODO - STORE SCHEMA IN DATABASE
	const upgrades = [];
	// const upgrades = SchemaVersions.versions
	// 	.reduce((acc, version) => {
	// 		if (version > schema?.version) {
	// 			acc.push(version);
	// 		}
	// 		return acc;
	// 	}, [] as number[])
	// 	.sort((a, b) => a - b);

	return upgrades.length > 0;
}
