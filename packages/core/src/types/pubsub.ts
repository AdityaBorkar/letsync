type SubscribeFn = (
	topic: string,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	callback: (data: any) => void,
) => Promise<void>;

type PublishFn = (
	topic: string,
	payload: {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		[key: string]: any;
	},
) => Promise<void>;

export type Letsync_PubSub_Frontend = {
	__brand: 'LETSYNC_PUBSUB_FRONTEND';
	connect: (props?: { token: string; clientId: string }) => Promise<{
		publish: PublishFn;
		subscribe: SubscribeFn;
		disconnect: () => Promise<void>;
	}>;
};

export type Letsync_PubSub_Backend = {
	__brand: 'LETSYNC_PUBSUB_BACKEND';
	secret: string;
	publish: PublishFn;
	subscribe: SubscribeFn;
	authFn: (token: string) => Promise<{
		subscribe: string[];
		publish: string[];
	}>;
};

export type PubSubToken = {
	value: string;
	expiresAt: number;
};
