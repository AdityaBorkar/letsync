import type { Extension, PGliteInterface } from "@electric-sql/pglite";

import type { Replocal_PubSub, ReplocalConfig } from "@replocal/core";

import initialize from "./ClientInterface/functions/initialize.js";

export default function ReplocalSync({
	pubsub,
	config,
}: {
	pubsub: Replocal_PubSub | Promise<Replocal_PubSub>;
	config: ReplocalConfig;
}): Extension {
	console.log("Starting Replocal Sync PGLite Extension");
	return {
		name: "Replocal Sync",
		async setup(pg: PGliteInterface) {
			console.log("Setting up Replocal Sync PGLite Extension");
			return {
				init: () => initialize({ pg, schema: config.dbSchema }),
				namespaceObj: { config, pubsub },
			};
		},
	};
}
