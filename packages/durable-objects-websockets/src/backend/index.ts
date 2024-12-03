import {
	IoTDataPlaneClient,
	PublishCommand,
} from '@aws-sdk/client-iot-data-plane';

import type { ServerPubsub } from '@letsync/core';
import { PubSubAuthorizer } from './authorizer.js';

export function PubSub({
	prefix,
	secret,
}: {
	prefix: string;
	secret: string;
}): ServerPubsub.Adapter {
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
			topic: `${prefix}/letsync/${topic}`,
		});
		const response = await client.send(command);
		console.log({ response });
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async function subscribe(topic: string, callback: (data: any) => void) {
		// TODO - WRITE THIS CODE
		console.log({ prefix, topic, callback });
		throw new Error('Not implemented. Contact maintainers.');
		// server.subscribe("src/subscriber.handler", {
		// 	filter: `${$app.name}/${$app.stage}/chat/room1`,
		// });
	}

	return {
		__brand: 'LETSYNC_PUBSUB_BACKEND',
		authFn: PubSubAuthorizer({ prefix, secret }),
		subscribe,
		publish,
		secret,
	};
}
