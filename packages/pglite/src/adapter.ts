import { frontend } from "@letsync/core";

import { PGlite } from "@electric-sql/pglite";
import type {
	Config,
	ClientDbAdapter,
	ClientDb_OpsAdapter,
	Letsync_PubSub_Frontend as PubsubAdapter,
} from "@letsync/core";

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
	database: DT;
	config: Config;
	pubsub: PubsubAdapter;
}): ClientDbAdapter {
	// TODO - SUPPORT REACT SUSPENSE

	const { database, pubsub, config } = props;

	if (!(database instanceof PGlite)) throw new Error("Invalid database");

	// ? PGLITE AUTOMATICALLY WAITS FOR THE DATABASE TO BE READY
	// await database.waitReady;

	const dbOpsAdapter = {
		sql: database.sql,
		txn: database.transaction,
		storageMetrics: () => {},
		exportData: () => {},
		close: () => database.close(),
	} as unknown as ClientDb_OpsAdapter; // satisfies ClientDb_OpsAdapter

	const functions = frontend.clientDb({
		config,
		pubsub,
		database: dbOpsAdapter,
	});

	return { __brand: "LETSYNC_CLIENT_DATABASE", ...functions };
}
