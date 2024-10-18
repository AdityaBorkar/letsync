declare const events: readonly ["auth.grant", "auth.refresh", "auth.revoke", "devices.register", "devices.deregister", "devices.pull", "devices.push", "devices.sync"];
export type EventName = (typeof events)[number];
export type EventCallbackFn = (data: any) => void;
export interface ClientDb_OpsAdapter {
    txn: Method_Txn;
    sql: Method_Sql;
    query: Method_Query;
    close: () => Promise<void>;
    exportData: Method_ExportData;
    storageMetrics: Method_StorageMetrics;
}
export interface ClientDbAdapter {
    __brand: "LETSYNC_CLIENT_DATABASE";
    sql: Method_Sql;
    exportData: Method_ExportData;
    storageMetrics: Method_StorageMetrics;
    close: () => Promise<void>;
    flush: () => Promise<void>;
    pull: () => Promise<void>;
    push: () => Promise<void>;
    live: (endpoints: string[]) => Promise<void>;
    device: {
        deregister: () => Promise<void>;
        register: () => Promise<undefined | {
            device: {
                userId: string;
                deviceId: string;
                isActive: boolean;
            };
            pubsub: {
                token: string;
                endpoints: string[];
            };
        }>;
    };
    schema: {
        getAvailableUpgrades: () => Promise<number[]>;
        migrate: (version: number) => Promise<void>;
    };
    event: {
        subscribe: (event: EventName, callback: EventCallbackFn) => Promise<void>;
        unsubscribe: (event: EventName, callback: EventCallbackFn) => Promise<void>;
    };
}
type Method_Sql = <RT>(sqlStrings: TemplateStringsArray, ...params: any[]) => Promise<Results<RT>>;
type Method_Query = <RT>(query: string, params?: any[]) => Promise<Results<RT>>;
interface Transaction {
    sql: Method_Sql;
    query: Method_Query;
    rollback(): Promise<void>;
    get closed(): boolean;
}
type Method_Txn = <T>(callback: (tx: Transaction) => Promise<Results<T>>) => Promise<Results<T> | undefined>;
type Method_ExportData = (compression: "none" | "gzip" | "auto") => Promise<File | Blob>;
type Method_StorageMetrics = () => void;
type Row<T = {
    [key: string]: any;
}> = T;
type Results<T> = {
    rows: Row<T>[];
    affectedRows?: number;
    fields: {
        name: string;
        dataTypeID: number;
    }[];
    blob?: Blob;
};
export {};
