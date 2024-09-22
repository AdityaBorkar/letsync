export default function live(userGroup: string) {
	// TODO - MQTT ENDPOINT SUBSCRIPTION
	const config = globalThis.replocal.config;
	const pubsub = globalThis.replocal.pubsub;

	pubsub.subscribe(userGroup, (data) => {
		console.log({ data });
	});
}
