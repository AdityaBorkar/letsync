import {
	IoTDataPlaneClient,
	PublishCommand,
} from "@aws-sdk/client-iot-data-plane";

import type { Replocal_PubSub_Backend } from "@replocal/types";
import Authorizer from "./authorizer.js";

export default function PubSub_Backend({
	prefix,
	secret,
}: {
	prefix: string;
	secret: string;
}): Replocal_PubSub_Backend {
	const client = new IoTDataPlaneClient();

	async function publish(
		topic: string,
		payload: {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			[key: string]: any;
		},
	) {
		const command = new PublishCommand({
			payload: Buffer.from(JSON.stringify(payload)),
			topic: `${prefix}/replocal/${topic}`,
		});
		const response = await client.send(command);
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async function subscribe(topic: string, callback: (data: any) => void) {
		// TODO - WRITE THIS CODE
		console.log({ prefix });
		throw new Error("Not implemented. Contact maintainers.");
		// server.subscribe("src/subscriber.handler", {
		// 	filter: `${$app.name}/${$app.stage}/chat/room1`,
		// });
	}

	return {
		__brand: "REPLOCAL_PUBSUB_BACKEND",
		AuthFn: Authorizer({ prefix, secret }),
		subscribe,
		publish,
		secret,
	};
}
