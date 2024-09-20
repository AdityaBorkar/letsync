import type { PGlite } from "@electric-sql/pglite";
import type { ReplocalConfig, Replocal_ClientDb } from "@replocal/core";
import device from "./functions/device.js";
import waitUntilReady from "./functions/waitUntilReady.js";
import event from "./functions/event.js";
import schema from "./functions/schema.js";
import pull from "./functions/pull.js";
import push from "./functions/push.js";
import live from "./functions/live.js";
import flush from "./functions/flush.js";

declare global {
	var replocal: {
		db: PGlite;
		config: ReplocalConfig;
	};
}

export type PGliteWithReplocal = PGlite & {
	replocal: { config: ReplocalConfig };
};

export default function TransformToClientInterface(
	database: PGliteWithReplocal,
): Replocal_ClientDb {
	// TODO - Connection Pooling on frontend
	globalThis.replocal = { db: database, config: database.replocal.config };

	return {
		__brand: "REPLOCAL_CLIENT_DB",
		database,
		waitUntilReady,
		flush,
		schema,
		device,
		push,
		pull,
		event,
		live,
	};
}
