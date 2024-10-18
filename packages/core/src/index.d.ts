export * from "./types/index.js";
export * as backend from "./backend/index.js";
import { clientDb } from "./frontend-db/index.js";
export declare const frontend: {
    clientDb: typeof clientDb;
    client: {
        initialize: typeof import("./frontend-client/initialize.js").default;
    };
};
