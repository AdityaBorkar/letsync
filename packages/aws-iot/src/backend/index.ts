import {
	IoTDataPlaneClient,
	PublishCommand,
} from '@aws-sdk/client-iot-data-plane';

import type { ServerPubsub } from '@letsync/core';
import { PubSubAuthorizer } from './authorizer.js';

type PubSubProps = {
	client?: IoTDataPlaneClient;
	prefix: string;
	secret: string;
};

/**
 * Creates an AWS IoT PubSub backend instance that connects to AWS IoT Core MQTT broker.
 * Can be initialized with an optional IoT Data Plane client for publishing messages.
 *
 * @param props - Configuration options
 * @param props.client - Optional IoT Data Plane client instance to use for publishing
 * @param props.prefix - Topic prefix for MQTT topics
 * @param props.secret - Secret key used to validate JWT tokens for authentication
 * @returns A PubSub backend instance for real-time messaging
 */
export function PubSub(props: PubSubProps): ServerPubsub.Adapter {
	const { client: _client, prefix, secret } = props;
	const client = _client ?? new IoTDataPlaneClient();

	/**
	 * Publishes a message to an AWS IoT topic
	 * @param {string} topic - Topic name to publish to
	 * @param {Object} payload - Message payload to publish
	 * @returns {Promise<void>}
	 */
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

	/**
	 * Subscribes to messages on an AWS IoT topic
	 * @param {string} topic - Topic name to subscribe to
	 * @param {Function} callback - Callback function to handle received messages
	 * @returns {Promise<void>}
	 * @throws {Error} Not implemented error
	 */
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
