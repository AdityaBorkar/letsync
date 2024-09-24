import type { Extension, PGliteInterface } from "@electric-sql/pglite";

import type {
	Replocal_PubSub_Frontend,
	Replocal_Config,
} from "@replocal/types";

import initialize from "./database/functions/initialize.js";

export default function ReplocalSyncExtension({
	pubsub,
	config,
}: {
	pubsub: Replocal_PubSub_Frontend | Promise<Replocal_PubSub_Frontend>;
	config: Replocal_Config;
}): Extension {
	return {
		name: "Replocal Sync",
		async setup(pg: PGliteInterface) {
			return {
				init: () => initialize({ pg, schema: config.dbSchema }),
				namespaceObj: { config, pubsub },
			};
		},
	};
}
