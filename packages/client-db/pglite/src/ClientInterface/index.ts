import type { PGlite } from "@electric-sql/pglite";
import type {
	ReplocalConfig,
	Replocal_ClientDb,
	Replocal_PubSub,
} from "../../../../types/lib/index.js";
import device from "./functions/device.js";
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

export default async function TransformToClientInterface(
	database: PGliteWithReplocal,
): Promise<Replocal_ClientDb> {
	// TODO - Connection Pooling on frontend

	await database.waitReady;

	globalThis.replocal = {
		db: database,
		config: database.replocal.config,
		pubsub: database.replocal.pubsub,
	};

	return {
		__brand: "REPLOCAL_CLIENT_DB",
		database,
		flush,
		schema,
		device,
		push,
		pull,
		event,
		live,
	};
}
