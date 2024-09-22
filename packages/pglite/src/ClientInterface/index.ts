import type { PGlite } from "@electric-sql/pglite";
import type {
	ReplocalConfig,
	Replocal_ClientDb,
	Replocal_PubSub,
} from "@replocal/core";
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
		pubsub: Replocal_PubSub;
	};
}

export type PGliteWithReplocal = PGlite & {
	replocal: {
		config: ReplocalConfig;
		pubsub: Replocal_PubSub;
	};
};

export default function TransformToClientInterface(
	database: PGliteWithReplocal,
): Replocal_ClientDb {
	// TODO - Connection Pooling on frontend
	console.log({ config: database.replocal });

	globalThis.replocal = {
		db: database,
		config: database.replocal.config,
		pubsub: database.replocal.pubsub,
	};

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
