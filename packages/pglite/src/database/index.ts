import type { PGlite } from "@electric-sql/pglite";
import type {
	Replocal_Config,
	Replocal_ClientDb,
	Replocal_PubSub_Frontend,
} from "@replocal/types";
import device from "./functions/device.js";
import event from "./functions/event.js";
import schema from "./functions/schema.js";
import pull from "./functions/pull.js";
import push from "./functions/push.js";
import live from "./functions/live.js";
import flush from "./functions/flush.js";
import close from "./functions/close.js";

type Connected_Replocal_PubSub = Awaited<
	ReturnType<Replocal_PubSub_Frontend["connect"]>
>;

declare global {
	var replocal: {
		db: PGliteWithReplocal;
		config: Replocal_Config;
		pubsub: Connected_Replocal_PubSub;
	};
}

export type PGliteWithReplocal = PGlite & {
	replocal: {
		config: Replocal_Config;
		pubsub: Connected_Replocal_PubSub;
	};
};

export default async function ReplocalClientDb<DT extends PGliteWithReplocal>(
	database: DT,
): Promise<Replocal_ClientDb<DT>> {
	// TODO - Connection Pooling on frontend

	await database.waitReady;

	globalThis.replocal = {
		db: database,
		config: database.replocal.config,
		pubsub: database.replocal.pubsub,
	};

	const functions = { flush, schema, device, close, push, pull, event, live };
	return {
		__brand: "REPLOCAL_CLIENT_DB",
		database,
		...functions,
	};
}
