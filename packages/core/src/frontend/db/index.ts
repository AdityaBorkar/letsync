import type {
	Config,
	ClientDbAdapter,
	ClientDb_OpsAdapter,
	Letsync_PubSub_Frontend as PubsubAdapter,
	EventName,
	EventCallbackFn,
} from "@/types/index.js";
import flush from "./flush.js";
import pull from "./pull.js";
import push from "./push.js";
import live from "./live.js";
import close from "./close.js";
import { register } from "./device/register.js";
import { deregister } from "./device/deregister.js";
import subscribe from "./event/subscribe.js";
import unsubscribe from "./event/unsubscribe.js";
import txn from "./txn.js";
import sql from "./sql.js";
import migrate from "./schema/migrate.js";
import getAvailableUpgrades from "./schema/getAvailableUpgrades.js";

export type Props = {
	database: ClientDb_OpsAdapter;
	schema: Config["dbSchema"];
	pubsub: PubsubAdapter;
	config: Config & {
		databaseName: string;
	};
};

export default function clientDb(props: {
	config: Config;
	pubsub: PubsubAdapter;
	dbOpsAdapter: ClientDb_OpsAdapter;
}): Omit<ClientDbAdapter, "database" | "__brand"> {
	const { dbOpsAdapter: database, pubsub, config } = props;

	if (pubsub.__brand !== "LETSYNC_PUBSUB_FRONTEND")
		throw new Error("Invalid pubsub");

	const { storageMetrics, exportData } = database;

	const Props = {
		pubsub,
		database,
		schema: config.dbSchema,
		config: { ...config, databaseName: "SET THIS" },
	};

	return {
		exportData,
		storageMetrics,
		sql: (...params: Parameters<typeof sql>) => sql(params, Props),
		// query: (query: string) => query(query, Props),
		// txn: (tx: any) => txn({ tx, ...Props }),
		close: () => close({ ...Props }),
		flush: () => flush({ ...Props }),
		pull: () => pull({ ...Props }),
		push: () => push({ ...Props }),
		live: (endpoints: string[]) => live({ endpoints, ...Props }),
		device: {
			register: () => register({ ...Props }),
			deregister: () => deregister({ ...Props }),
		},
		event: {
			subscribe: (eventName: EventName, callback: EventCallbackFn) =>
				subscribe({ eventName, callback, ...Props }),
			unsubscribe: (eventName: EventName, callback: EventCallbackFn) =>
				unsubscribe({ eventName, callback, ...Props }),
		},
		schema: {
			migrate: (version: number) => migrate({ ...Props }),
			getAvailableUpgrades: () => getAvailableUpgrades({ ...Props }),
		},
	};
}

// TODO - REPLACE NAMES WITH ARCHITECTURE DESIGN PATTERNS
