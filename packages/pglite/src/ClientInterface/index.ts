import type { PGlite } from "@electric-sql/pglite";
import type { ReplocalConfig, Replocal_ClientDb } from "@replocal/core";
import { deregister, register } from "./device.js";

export type PGliteWithReplocal = PGlite & {
	replocal: { config: ReplocalConfig };
};

export default function TransformToClientInterface(
	pg: PGliteWithReplocal,
): Replocal_ClientDb {
	// TODO - [v2] Connection Pooling on frontend

	// TODO - [IMPORTANT] Make pg and apiBaseUrl GLOBAL IMPORTS

	return {
		database: pg,
		waitUntilReady: async () =>
			new Promise((resolve, reject) => {
				pg.waitReady.then(() => resolve(true));
			}),
		events: {
			subscribe: (event: string, callback: (data: any) => void) => {},
			unsubscribe: (event: string, callback: (data: any) => void) => {},
		},
		device: {
			// TODO - COMPLETE WITH MANUAL TESTING
			register: () => register(pg),
			deregister: () => deregister(pg),
		},
		schema: {
			validate: (schema: any) => {},
			migrate: (schema: any) => {},
		},
		// live() {
		// 	// TODO - MQTT ENDPOINT SUBSCRIPTION
		// },
		pull: () => {
			// TODO - (WRITE LOCK) ENABLE
			// TODO - READ THE `CACHE` USING (CURSOR / DATETIME)
			// TODO - OPERATIONS: `CACHE`
			// TODO - STORE THE NEW (CURSOR / DATETIME)
			// TODO - READ THE `CDC` USING (CURSOR / DATETIME)
			// TODO - OPERATIONS `CDC`
			// TODO - STORE THE NEW (CURSOR / DATETIME)
			// TODO - (WRITE LOCK) RELEASE
		},
		push: () => {
			// TODO - (WRITE LOCK) ENABLE
			// TODO - PUSH WRITE REQUESTS
			// TODO - COLLECT ERRORS (DO NOT DO ANYTHING WITH THEM FOR NOW)
			// TODO - (WRITE LOCK) RELEASE
		},
		sync: () => {
			// TODO - PUSH CHANGES TO SERVER
			// TODO - PULL CHANGES FROM SERVER
			// TODO - GO LIVE
			console.log("TO BE IMPLEMENTED");
		},
	};
}
