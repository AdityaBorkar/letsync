import type { Extension, PGliteInterface } from '@electric-sql/pglite';

import type { Letsync_PubSub_Frontend, Letsync_Config } from '@letsync/core';

// import initialize from "@letsync/core/src/frontend/db/functions/initialize.js";

export default function LetsyncSyncExtension({
	pubsub,
	config,
}: {
	pubsub: Letsync_PubSub_Frontend | Promise<Letsync_PubSub_Frontend>;
	config: Letsync_Config;
}): Extension {
	return {
		name: 'Letsync Sync',
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
