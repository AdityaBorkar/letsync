import cacheDelete from "./cache/delete.js";
import cacheRetrieve from "./cache/retrieve.js";
import cacheUpsert from "./cache/upsert.js";
import changesAdd from "./db/changes/add.js";
import changesGet from "./db/changes/get.js";
import changesStatus from "./db/changes/status.js";
import databaseInit from "./db/init/index.js";
import deviceRegister from "./device/register.js";
import deviceUnregister from "./device/unregister.js";
import cdcCapture from "./db/cdc/capture.js";

export const device = {
	register: deviceRegister,
	unregister: deviceUnregister,
};

export const db = {
	init: databaseInit,
	cdc: {
		capture: cdcCapture,
	},
	changes: {
		add: changesAdd,
		get: changesGet,
		status: changesStatus,
	},
};

export const cache = {
	delete: cacheDelete,
	retrieve: cacheRetrieve,
	upsert: cacheUpsert,
};
