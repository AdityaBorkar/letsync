export type Letsync_ServerDb<DT extends unknown> = {
    __brand: "LETSYNC_SERVER_DB";
    database: DT;
    waitUntilReady: () => Promise<void>;
} & ({
    type: "SQL";
    query: (query: string) => Promise<any>;
} | {
    type: "NOSQL";
});
