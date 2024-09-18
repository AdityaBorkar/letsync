import { Replocal_ServerDb } from "@replocal/core";

export function ServerDb(db: any): Replocal_ServerDb {
	// TODO - Connection Pooling on backend

	return {
		database: db,
		waitUntilReady: () =>
			new Promise(async (resolve) => {
				await db.connect();
				resolve(true);
			}),
	};
}
