import type { OrmFunction } from '@/types/OrmFunction.js';
import type { Config, ServerDB, ServerPubsub } from '@letsync/core';
import type { ClientConfig } from 'pg';

import { Client } from 'pg';

// import { buildSchema } from './buildSchema.js';
// import { close } from './close.js';
// import exportData from './exportData.js';
// import { flush } from './flush.js';
// import getStorageMetrics from './getStorageMetrics.js';
// import { open } from './open.js';
// import { sql } from './sql.js';

// type Schema = null;

interface createDBConfig {
	name: string;
	orm?: OrmFunction;
	// TODO: EVENT HANDLERS AND UPDATES HANDLERS
}

export function createDB(
	config: createDBConfig,
	props?: ClientConfig | Client,
): ServerDB.CreateAdapter<Client> {
	const { name } = config;
	const dbClient = props instanceof Client ? props : new Client(props);
	const { schema } = config.orm ? config.orm(dbClient) : { schema: null };

	return ({
		pubsub,
		config,
	}: {
		pubsub: ServerPubsub.Adapter;
		config: Config;
	}) => {
		console.log({ schema, pubsub, config });
		return {
			__brand: 'LETSYNC_SERVER_DATABASE',
			type: 'SQL',
			name,
			client: dbClient,
			query: (query: string) => dbClient.query(query),
			waitUntilReady: () => Promise.resolve(dbClient.connect()),
			// open: () => open(dbClient),
			// flush: () => flush(dbClient),
			// close: () => close(dbClient),
			// buildSchema: (schema: Schema) =>
			// 	buildSchema({ client: dbClient, schema }),
			// storageMetrics: () => getStorageMetrics(dbClient),
			// sql: <T>(...props: Parameters<typeof dbClient.sql>) =>
			// 	sql<T>({ client: dbClient, schema }, ...props),
			// exportData: (options: Parameters<typeof exportData>[1]) =>
			// 	exportData({ client: dbClient, schema }, options),
		};
	};
}

// CREATE, PAUSE, RESUME, ALTER, and CANCEL.
// SHOW CHANGEFEED JOBS

// TODO - MAKE A COCKROACHDB PACAKGE FOR :
// 1. TABLE CREATION + SCHEMA MIGRATIONS
// 2. CHANGEFEEDS subscription
// 3. changefeeds processing
