import TypedFetch from '@/frontend-db/utils/TypedFetch.js';
import type { Props } from '../index.js';

export async function getAvailableUpgrades(
	props: undefined,
	superProps: Props,
) {
	console.log({ props });
	const { metadata, apiBaseUrl } = superProps;

	const schema = await metadata.get('schema');

	const SchemaVersions = await TypedFetch({
		method: 'GET',
		baseUrl: apiBaseUrl,
		endpoint: '/schema/versions',
		searchParams: undefined,
	});

	const upgrades = SchemaVersions.versions
		.reduce((acc, version) => {
			if (version > schema.version) {
				acc.push(version);
			}
			return acc;
		}, [] as number[])
		.sort((a, b) => a - b);

	return upgrades;
}
