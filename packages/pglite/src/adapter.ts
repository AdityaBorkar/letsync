import { frontend } from '@letsync/core';

import { PGlite } from '@electric-sql/pglite';
import type {
	Config,
	ClientDbAdapter,
	ClientDb_OpsAdapter,
	Letsync_PubSub_Frontend as PubsubAdapter,
} from '@letsync/core';
import exportData from './exportData.js';
import getStorageMetrics from './getStorageMetrics.js';

/**
 * Write your adapter docs here.
 *
 * query, exec, sql is merged into one function `sql`
 *
 * transaction`
 *
 * listen, unlisten, subscribe, unsubscribe into `events`
 *
 * export - Exports all data
 *
 * @link https://letsync.dev/docs/integrations/client-database
 *
 * @param props
 *
 * @returns
 *
 * @example
 */
export default function useDatabaseAdapter<DT extends PGlite>(props: {
	pubsub: PubsubAdapter;
	database: DT;
	dbSchema: Config['dbSchema'];
	apiBaseUrl?: string;
}): ClientDbAdapter {
	const { database, pubsub, dbSchema, apiBaseUrl } = props;

	if (!(database instanceof PGlite)) throw new Error('Invalid database');

	const API_BASE_URL =
		apiBaseUrl ||
		// @ts-expect-error
		import.meta.env.NEXT_PUBLIC_LETSYNC_API_BASE_URL ||
		// @ts-expect-error
		import.meta.env.LETSYNC_API_BASE_URL;
	if (!API_BASE_URL) throw new Error('API Base URL is not set'); // ! TODO - TEST

	// ? PGLITE AUTOMATICALLY WAITS FOR THE DATABASE TO BE READY
	// await database.waitReady;

	const dbOpsAdapter = {
		sql: database.sql,
		query: database.query,
		txn: database.transaction,
		close: database.close,
		storageMetrics: () => getStorageMetrics(database),
		exportData: (props: Parameters<typeof exportData>[0]) =>
			exportData(props, database),
	} satisfies ClientDb_OpsAdapter;

	const methods = frontend.clientDb({
		pubsub,
		dbSchema,
		dbOpsAdapter,
		apiBaseUrl: API_BASE_URL,
	});

	// @ts-expect-error
	return { __brand: 'LETSYNC_CLIENT_DATABASE', ...methods };
}
