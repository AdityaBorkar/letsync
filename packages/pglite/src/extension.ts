import type { Extension, PGliteInterface } from '@electric-sql/pglite';

import type { Letsync_PubSub_Frontend, Letsync_Config } from '@letsync/core';

// import initialize from "@letsync/core/src/frontend/db/functions/initialize.js";

/**
 * Creates a Letsync Sync extension.
 *
 * @param {Object} params - The parameters for the extension.
 * @param {Letsync_PubSub_Frontend | Promise<Letsync_PubSub_Frontend>} params.pubsub - The pubsub frontend or a promise that resolves to it.
 * @param {Letsync_Config} params.config - The configuration for Letsync.
 * @returns {Extension} The Letsync Sync extension.
 */
export default function LetsyncSyncExtension({
	pubsub,
	config,
}: {
	pubsub: Letsync_PubSub_Frontend | Promise<Letsync_PubSub_Frontend>;
	config: Letsync_Config;
}): Extension {
	return {
		name: 'Letsync Sync',
		/**
		 * Sets up the Letsync Sync extension.
		 *
		 * @param {PGliteInterface} pg - The PGlite interface.
		 * @returns {Promise<Object>} An object containing the namespace object.
		 */
		async setup(pg: PGliteInterface) {
			console.log({ pg });
			return {
				// init: () => initialize({ pg, schema: config.dbSchema }),
				namespaceObj: { config, pubsub },
			};
		},
	};
}

// TODO - Use enscripten to compile to wasm and enable native calls to support adapter functions, thereby reducing risk of runtime errors
