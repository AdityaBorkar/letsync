import type { Config, ClientDbAdapter, ClientDb_OpsAdapter, Letsync_PubSub_Frontend as PubsubAdapter } from "@/types/index.js";
export type Props = {
    name: string;
    database: ClientDb_OpsAdapter;
    metadata: {
        upsert: (name: string, content: {
            [key: string]: any;
        }) => void;
        get: (name: string) => Promise<{
            [key: string]: any;
        }>;
        remove: (name: string) => void;
    };
    pubsub: PubsubAdapter;
    apiBaseUrl: string;
    dbSchema: Config["dbSchema"];
};
export default function clientDb(props: {
    apiBaseUrl: string;
    pubsub: PubsubAdapter;
    dbSchema: Config["dbSchema"];
    dbOpsAdapter: ClientDb_OpsAdapter;
}): Omit<ClientDbAdapter, "database" | "__brand">;
