// @ts-expect-error
import type { Resource } from "sst/aws";

import {
	IoTDataPlaneClient,
	PublishCommand,
} from "@aws-sdk/client-iot-data-plane";

import type { Replocal_PubSub } from "../../../types/lib/index.js";

export default function newPubsub(Resource: Resource): Replocal_PubSub {
	const client = new IoTDataPlaneClient();
	// region: "ap-south-1", // TODO - REMOVE HARDCODED REGION
	// endpoint: "https://a1lfjmuly172sb-ats.iot.ap-south-1.amazonaws.com", // TODO - REMOVE HARDCODED ENDPOINT

	async function publish(
		userGroup: string,
		payload: {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			[key: string]: any;
		},
	) {
		const prefix = `${Resource.App.name}/${Resource.App.stage}`;
		console.log({
			topic: `${prefix}/${userGroup}/replocal`,
			payload: JSON.stringify(payload, null, 4),
		});
		const command = new PublishCommand({
			payload: Buffer.from(JSON.stringify(payload)),
			topic: `${prefix}/${userGroup}/replocal`,
		});
		const response = await client.send(command);
	}

	async function subscribe(
		userGroup: string,
		callback: (message: string) => void,
	) {
		const prefix = `${Resource.App.name}/${Resource.App.stage}`;
		console.log({ prefix });
		// server.subscribe("src/subscriber.handler", {
		// 	filter: `${$app.name}/${$app.stage}/chat/room1`,
		// });
	}

	return {
		__brand: "REPLOCAL_PUBSUB",
		publish,
		subscribe,
	};
}
