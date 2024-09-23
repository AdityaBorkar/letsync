import type { Replocal_PubSub } from "@replocal/types";
import mqtt from "mqtt";

export default async function usePubsub({
	authorizer,
	endpoint,
	prefix,
}: {
	authorizer: string;
	endpoint: string;
	prefix: string;
}): Promise<Replocal_PubSub> {
	// TODO - AUTHENTICATION
	const token = "PLACEHOLDER_TOKEN";
	const deviceId = "PLACEHOLDER_DEVICE_ID";
	const userGroup = "vasundhara-aakash";

	const connection = mqtt.connect(
		`wss://${endpoint}/mqtt?x-amz-customauthorizer-name=${authorizer}`,
		{
			protocolVersion: 5,
			manualConnect: true,
			username: "",
			password: token,
			clientId: `device_${deviceId}`,
		},
	);

	connection.on("error", async (error) => {
		console.error("Error connecting to MQTT", error);
	});

	connection.on("connect", async () => {
		try {
			await connection.subscribeAsync(`${prefix}/${userGroup}/replocal`, {
				qos: 1,
			});
		} catch (error) {
			console.error("Error subscribing to topic", error);
		}
	});

	connection.connect();
	// todo - resolve only if successfully connected

	async function subscribe(
		userGroup: string,
		callback: (topic: string, data: string) => void,
		// topic: string,
		// callback: (topic: string, data: string) => void,
	) {
		connection.on("message", (fullTopic: string, payload: Buffer) => {
			if (fullTopic !== `${prefix}/replocal/${userGroup}`) return;
			const data = new TextDecoder("utf8").decode(new Uint8Array(payload));
			callback(fullTopic, data);
		});
	}

	async function publish(
		userGroup: string,
		payload: {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			[key: string]: any;
		},
	) {
		// TODO  - IF CONNECTION NOT READY, STORE TOPIC IN QUEUE
		const message = JSON.stringify(payload);
		connection.publish(`${prefix}/replocal/${userGroup}`, message, { qos: 1 });
	}

	return {
		__brand: "REPLOCAL_PUBSUB",
		subscribe,
		publish,
	};
}
