import type { Props } from "./index.js";

interface LiveProps {
	endpoints: string[];
}

export default async function live(props: LiveProps, superProps: Props) {
	// TODO - MQTT ENDPOINT SUBSCRIPTION
	const { endpoints } = props;
	const { apiBaseUrl, pubsub } = superProps;

	// TODO - POLL FOR ALLOWED TOPICS AND THEN SUBSCRIBE TO ALL

	for (const endpoint of endpoints) {
		// pubsub.subscribe(endpoint, (data) => {
		// 	console.log("CONGRATULATIONS!! RECIEVED DATA:");
		// 	console.log({ data });
		// 	// TODO - WRITE
		// });
	}
}

// TODO - WRITE CODE TO CANCEL SUBSCRIPTIONS
// const live = { subscribe, unsubscribe };
// async function subscribe() {}
// async function unsubscribe() {}
