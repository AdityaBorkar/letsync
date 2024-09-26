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

export type Replocal_PubSub_Frontend = {
	__brand: "REPLOCAL_PUBSUB_FRONTEND";
	connect: (props: { token: string; clientId: string }) => Promise<{
		publish: PublishFn;
		subscribe: SubscribeFn;
		disconnect: () => Promise<void>;
	}>;
};

export type Replocal_PubSub_Backend = {
	__brand: "REPLOCAL_PUBSUB_BACKEND";
	publish: PublishFn;
	subscribe: SubscribeFn;
	tokenSecret: string;
	AuthFn: (token: string) => Promise<{
		subscribe: string[];
		publish: string[];
	}>;
};

export type PubsubToken = {
	value: string;
	expiresAt: number;
};
