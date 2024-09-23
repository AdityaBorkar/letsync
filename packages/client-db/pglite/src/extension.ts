import type { Extension, PGliteInterface } from "@electric-sql/pglite";

import type {
	Replocal_PubSub,
	ReplocalConfig,
} from "../../../types/lib/index.js";

import initialize from "./ClientInterface/functions/initialize.js";

export default function ReplocalSync({
	pubsub,
	config,
}: {
	pubsub: Replocal_PubSub | Promise<Replocal_PubSub>;
	config: ReplocalConfig;
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
