import type { Replocal_PubSub } from "@replocal/core";
import mqtt from "mqtt";

function createConnection(endpoint: string, authorizer: string) {
	return mqtt.connect(
		`wss://${endpoint}/mqtt?x-amz-customauthorizer-name=${authorizer}`,
		{
			protocolVersion: 5,
			manualConnect: true,
			username: "", // Must be empty for the authorizer
			password: "PLACEHOLDER_TOKEN", // Passed as the token to the authorizer
			clientId: `client_${window.crypto.randomUUID()}`, // TODO - `${DEVICE_ID}+${RANDOM}`
		},
	);
}

export default async function useMqtt(Resource: {
	App: {
		name: string;
		stage: string;
	};
	Realtime: {
		endpoint: string;
		authorizer: string;
	};
}): Promise<Replocal_PubSub> {
	// const client = new MqttClient(Resource.Realtime.endpoint, {
	// 	protocol: "mqtt",
	// 	host: Resource.Realtime.endpoint,
	// 	// port: 8883,
	// 	rejectUnauthorized: true,
	// });

	const prefix = `${Resource.App.name}/${Resource.App.stage}`;
	const userGroup = "vasundhara-aakash";

	const connection = createConnection(
		Resource.Realtime.endpoint,
		Resource.Realtime.authorizer,
	);

	connection.on("connect", async () => {
		try {
			console.log("Connected to MQTT");
			await connection.subscribeAsync(`${prefix}/${userGroup}/replocal`, {
				qos: 1,
			});
		} catch (e) {
			console.error(e);
		}
	});

	function subscribe(
		topic: string,
		callback: (topic: string, data: string) => void,
	) {
		connection.on("message", (fullTopic: string, payload: Buffer) => {
			if (fullTopic !== `${prefix}/${userGroup}/${topic}`) return;
			const data = new TextDecoder("utf8").decode(new Uint8Array(payload));
			callback(topic, data);
		});
	}

	function publish(topic: string, payload: string) {
		connection.publish(`${prefix}/${userGroup}/${topic}`, payload, { qos: 1 });
	}

	return {
		__brand: "REPLOCAL_PUBSUB",
		subscribe,
		publish,
	};
}
