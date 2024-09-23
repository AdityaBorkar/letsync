export type Replocal_PubSub = {
	__brand: "REPLOCAL_PUBSUB";
	publish: (
		userGroup: string,
		payload: {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			[key: string]: any;
		},
	) => Promise<void>;
	subscribe: (
		userGroup: string,
		callback: (message: string) => void,
	) => Promise<void>;
};
