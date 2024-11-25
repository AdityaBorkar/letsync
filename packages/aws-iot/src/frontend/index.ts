import type { ClientPubsub } from '@letsync/core';
import type { MqttClient } from 'mqtt';

import $connect from './connect.js';

type PubSubClient = {
	prefix: string;
	client: MqttClient;
};

type PubSubAuthorizer = {
	prefix: string;
	authorizer: string;
	endpoint: string;
};

type PubSubProps = PubSubClient | PubSubAuthorizer;

/**
 * Creates an AWS IoT PubSub frontend instance that connects to AWS IoT Core MQTT broker.
 * Can be initialized either with an existing MQTT client or with AWS IoT endpoint details.
 *
 * @param props - Configuration options
 * @param props.client - Optional existing MQTT client instance to use
 * @param props.authorizer - Name of the AWS IoT custom authorizer (required if client not provided)
 * @param props.endpoint - AWS IoT endpoint URL (required if client not provided)
 * @param props.prefix - Topic prefix for MQTT topics
 * @returns A PubSub frontend instance for real-time messaging
 */
export function PubSub<PT extends PubSubProps>(
	props: PT,
): ClientPubsub.Adapter {
	const superProps = props;

	/**
	 * Establishes connection to AWS IoT MQTT broker
	 * @param {Object} props - Connection properties
	 * @param {string} props.token - JWT token for authentication
	 * @param {string} props.clientId - Unique client identifier
	 * @returns {Promise<{subscribe: Function, publish: Function, disconnect: Function}>} Connection methods
	 */
	async function connect(
		props?: { token: string; clientId: string },
		// props: PT extends PubSubClient
		// 	? { token: string; clientId: string }
		// 	: undefined,
	) {
		const connection =
			'client' in superProps
				? superProps.client
				: // @ts-expect-error - TODO
					await $connect({ ...props, ...superProps });

		/**
		 * Subscribes to messages on a specific topic
		 * @param {string} topic - Topic name to subscribe to
		 * @param {Function} callback - Callback function to handle received messages
		 * @returns {Promise<void>}
		 */
		async function subscribe(topic: string, callback: (data: string) => void) {
			if (!connection.connected) {
				throw new Error('PubSub Connection not ready');
			}

			const fullTopic = `${superProps.prefix}/letsync/${topic}`;
			await connection.subscribeAsync(fullTopic, { qos: 1 });
			connection.on('message', (fullTopic: string, payload: Buffer) => {
				if (fullTopic !== `${superProps.prefix}/letsync/${topic}`) {
					return;
				}
				const message = new TextDecoder('utf8').decode(new Uint8Array(payload));
				const data = JSON.parse(message);
				callback(data);
			});
		}

		/**
		 * Publishes a message to a specific topic
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
			if (!connection.connected) {
				throw new Error('PubSub Connection not ready');
			}

			// TODO  - IF CONNECTION NOT READY, STORE TOPIC IN QUEUE
			const message = JSON.stringify(payload);
			const fullTopic = `${superProps.prefix}/letsync/${topic}`;
			connection.publish(fullTopic, message, { qos: 1 });
		}

		/**
		 * Disconnects from the MQTT broker
		 * @returns {Promise<void>}
		 */
		async function disconnect() {
			if (!connection.connected) {
				throw new Error('PubSub Connection not ready');
			}

			// TODO - TEST THIS, AI GENERATED.
			await connection.end();
		}

		return { subscribe, publish, disconnect };
	}

	return { __brand: 'LETSYNC_PUBSUB_FRONTEND', connect };
}
