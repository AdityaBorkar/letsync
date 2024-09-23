export default function live(userGroup: string) {
	// TODO - MQTT ENDPOINT SUBSCRIPTION
	const config = globalThis.replocal.config;
	const pubsub = globalThis.replocal.pubsub;

	// TODO - POLL FOR ALLOWED TOPICS AND THEN SUBSCRIBE TO ALL

	pubsub.subscribe(userGroup, (topic, data) => {
		console.log("CONGRATULATIONS!! RECIEVED DATA:");
		console.log({ topic, data });
	});
}
