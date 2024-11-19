export namespace ClientPubsub {
	export type Adapter = Letsync_PubSub_Frontend;
}

export namespace ServerPubsub {
	export type Adapter = Letsync_PubSub_Backend;
	export type Token = PubSubToken;
}

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

type Letsync_PubSub_Frontend = {
	__brand: 'LETSYNC_PUBSUB_FRONTEND';
	connect: (props?: { token: string; clientId: string }) => Promise<{
		publish: PublishFn;
		subscribe: SubscribeFn;
		disconnect: () => Promise<void>;
	}>;
};

type Letsync_PubSub_Backend = {
	__brand: 'LETSYNC_PUBSUB_BACKEND';
	secret: string;
	publish: PublishFn;
	subscribe: SubscribeFn;
	authFn: (token: string) => Promise<{
		subscribe: string[];
		publish: string[];
	}>;
};

type PubSubToken = {
	value: string;
	expiresAt: number;
};
