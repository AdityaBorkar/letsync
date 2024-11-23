import type { PGlite } from '@electric-sql/pglite';

interface Params {
	client: PGlite;
	schema: string;
}

export function sql<T>(
	params: Params,
	...props: Parameters<typeof params.client.sql>
) {
	const { client, schema } = params;

	// TODO - ADD OPTION TO SUBSCRIBE, TO READ OPTIMISTIC OR NOT
	// TODO - Support Typescript
	console.log({ schema });

	return client.sql<T>(...props);
}
