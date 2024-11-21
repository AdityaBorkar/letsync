import type { ClientParams } from '../create.js';

interface LiveProps {
	endpoints: string[];
}

export function live(props: LiveProps, params: ClientParams) {
	// TODO - MQTT ENDPOINT SUBSCRIPTION
	const { endpoints } = props;
	// const { apiBaseUrl, pubsub } = superProps;
	console.log({ props, params });

	// TODO - POLL FOR ALLOWED TOPICS AND THEN SUBSCRIBE TO ALL

	for (const endpoint of endpoints) {
		console.log({ endpoint });
		// pubsub.subscribe(endpoint, (data) => {
		// 	console.log("CONGRATULATIONS!! RECEIVED DATA:");
		// 	console.log({ data });
		// 	// TODO - WRITE
		// });
	}
}

// TODO - WRITE CODE TO CANCEL SUBSCRIPTIONS
// const live = { subscribe, unsubscribe };
// async function subscribe() {}
// async function unsubscribe() {}
