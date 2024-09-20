import type { Extension, PGliteInterface } from "@electric-sql/pglite";

import type { ReplocalConfig } from "@replocal/core";

import initialize from "./ClientInterface/functions/initialize.js";

export default function ReplocalSync(config: ReplocalConfig): Extension {
	return {
		name: "Replocal Sync",
		async setup(pg: PGliteInterface) {
			return {
				init: () => initialize({ pg, schema: config.dbSchema }),
				namespaceObj: { config },
			};
		},
	};
}
