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
export declare const device: {
    register: typeof deviceRegister;
    unregister: typeof deviceUnregister;
};
export declare const db: {
    init: typeof databaseInit;
    cdc: {
        capture: typeof cdcCapture;
    };
    changes: {
        add: typeof changesAdd;
        get: typeof changesGet;
        status: typeof changesStatus;
    };
};
export declare const cache: {
    delete: typeof cacheDelete;
    retrieve: typeof cacheRetrieve;
    upsert: typeof cacheUpsert;
};
