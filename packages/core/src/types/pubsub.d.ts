type SubscribeFn = (topic: string, callback: (data: any) => void) => Promise<void>;
type PublishFn = (topic: string, payload: {
    [key: string]: any;
}) => Promise<void>;
export type Letsync_PubSub_Frontend = {
    __brand: "LETSYNC_PUBSUB_FRONTEND";
    connect: (props: {
        token: string;
        clientId: string;
    }) => Promise<{
        publish: PublishFn;
        subscribe: SubscribeFn;
        disconnect: () => Promise<void>;
    }>;
};
export type Letsync_PubSub_Backend = {
    __brand: "LETSYNC_PUBSUB_BACKEND";
    secret: string;
    publish: PublishFn;
    subscribe: SubscribeFn;
    AuthFn: (token: string) => Promise<{
        subscribe: string[];
        publish: string[];
    }>;
};
export type PubsubToken = {
    value: string;
    expiresAt: number;
};
export {};
