import type { ClientDB, ClientPubsub, Schema } from '@letsync/core';
import { PGlite, type PGliteOptions } from '@electric-sql/pglite';

import exportData from './functions/exportData.js';
import getStorageMetrics from './functions/getStorageMetrics.js';
import { open } from './functions/open.js';
import { flush } from './functions/flush.js';
import { close } from './functions/close.js';
import { sql } from './functions/sql.js';

interface createClientDBConfig {
	name: string;
}

export function createClientDB(
	props: PGlite | PGliteOptions,
	config: createClientDBConfig,
): ClientDB.CreateAdapter<PGlite> {
	const { name } = config;
	const client = props instanceof PGlite ? props : new PGlite(props);

	return (props: {
		pubsub: ClientPubsub.Adapter;
		schema: Schema;
	}) => {
		const { schema } = props;
		return {
			__brand: 'LETSYNC_CLIENT_DATABASE',
			name,
			client,
			open: () => open(client),
			flush: () => flush(client),
			close: () => close(client),
			sql: <T>(...props: Parameters<typeof client.sql>) =>
				sql<T>({ client, schema }, ...props),
			storageMetrics: () => getStorageMetrics(client),
			exportData: (props: Parameters<typeof exportData>[0]) =>
				exportData(props, client),
		};
	};
}
