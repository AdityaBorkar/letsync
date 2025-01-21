import cacheDelete from './cache/delete.js';
import cacheRetrieve from './cache/retrieve.js';
import cacheUpsert from './cache/upsert.js';
import cdcCapture from './db/cdc/capture.js';
import changesAdd from './db/changes/add.js';
import changesGet from './db/changes/get.js';
import changesStatus from './db/changes/status.js';
import databaseInit from './db/init/index.js';
import deviceRegister from './device/register.js';
import deviceUnregister from './device/unregister.js';
import schemaGetLatest from './schema/getLatest.js';

const device = {
	register: deviceRegister,
	unregister: deviceUnregister,
};

const db = {
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

const cache = {
	upsert: cacheUpsert,
	delete: cacheDelete,
	retrieve: cacheRetrieve,
};

const schema = {
	getLatest: schemaGetLatest,
};

const RestEndpoints = {
	GET: {
		// "/cache": cacheRetrieve,
		'/db/changes/status': db.changes.status,
		'/db/changes': db.changes.get,
		'/db/init': db.init,
		'/schema': schema.getLatest,
	},
	POST: {
		// "/cache": cacheUpsert,
		'/db/changes': db.changes.add,
		'/db/cdc': db.cdc.capture,
		'/device': device.register,
	},
	DELETE: {
		// "/cache": cacheDelete,
		'/device': device.unregister,
	},
} as const;

export const server = {
	functions: { device, db, cache, schema },
	router: RestEndpoints,
};
