import type { ClientDbAdapter, Letsync_PubSub_Frontend as PubsubAdapter } from "@/types/index.js";
export default function initialize({ workers, pubsub: _pubsub, database: _database, }: {
    workers: boolean;
    pubsub: PubsubAdapter;
    database: ClientDbAdapter;
}): Promise<{
    pubsub: {
        publish: (topic: string, payload: {
            [key: string]: any;
        }) => Promise<void>;
        subscribe: (topic: string, callback: (data: any) => void) => Promise<void>;
        disconnect: () => Promise<void>;
    };
    database: ClientDbAdapter;
    close: () => void;
}>;
