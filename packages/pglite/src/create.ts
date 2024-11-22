import type { ClientDB, ClientPubsub, Config } from '@letsync/core';
import { PGlite, type PGliteOptions } from '@electric-sql/pglite';

import { createAdapter_ClientDB_SQL } from '@letsync/core';

import exportData from './functions/exportData.js';
import getStorageMetrics from './functions/getStorageMetrics.js';

interface InitConfig extends Config {
	name: string;
	pubsub: ClientPubsub.Adapter;
}

export function createClientDB(
	props: PGlite | PGliteOptions,
	config: InitConfig,
): ClientDB.Adapter<PGlite> {
	const client = props instanceof PGlite ? props : new PGlite(props);

	const operations = {
		sql: client.sql,
		query: client.query,
		txn: client.transaction,
		close: client.close,
		storageMetrics: () => getStorageMetrics(client),
		exportData: (props: Parameters<typeof exportData>[0]) =>
			exportData(props, client),
	} satisfies ClientDB.OperationsAdapter.SQL;

	const adapter = createAdapter_ClientDB_SQL({ client, operations, config });
	return adapter;
}
