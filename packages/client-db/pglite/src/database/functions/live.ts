export default async function live(endpoints: string[]) {
	// TODO - MQTT ENDPOINT SUBSCRIPTION
	const config = globalThis.replocal.config;
	const pubsub = globalThis.replocal.pubsub;

	// TODO - POLL FOR ALLOWED TOPICS AND THEN SUBSCRIBE TO ALL

	for (const endpoint of endpoints) {
		pubsub.subscribe(endpoint, (data) => {
			console.log("CONGRATULATIONS!! RECIEVED DATA:");
			console.log({ data });
			// TODO - WRITE
		});
	}
}

// TODO - WRITE CODE TO CANCEL SUBSCRIPTIONS
// const live = { subscribe, unsubscribe };
// async function subscribe() {}
// async function unsubscribe() {}
