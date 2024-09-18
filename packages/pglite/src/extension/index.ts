import type { Extension, PGliteInterface } from "@electric-sql/pglite";

import type { ReplocalConfig } from "@replocal/core";

import initDb from "./initDb.js";

export default function ReplocalSync(config: ReplocalConfig): Extension {
	return {
		name: "Replocal Sync",
		async setup(pg: PGliteInterface) {
			return {
				init: () => initDb({ pg, schema: config.dbSchema }),
				namespaceObj: { config },
			};
		},
	};
}
