import type { Letsync_PubSub_Frontend } from '@letsync/core';

import $connect from './connect.js';

/**
 * Creates an AWS IoT PubSub frontend instance
 * @param {Object} props - Configuration properties
 * @param {string} props.authorizer - Name of the AWS IoT custom authorizer
 * @param {string} props.endpoint - AWS IoT endpoint URL
 * @param {string} props.prefix - Topic prefix for MQTT topics
 * @returns {Letsync_PubSub_Frontend} PubSub frontend instance
 */
export function PubSub(props: {
	authorizer: string;
	endpoint: string;
	prefix: string;
}): Letsync_PubSub_Frontend {
	const superProps = props;

	/**
	 * Establishes connection to AWS IoT MQTT broker
	 * @param {Object} props - Connection properties
	 * @param {string} props.token - JWT token for authentication
	 * @param {string} props.clientId - Unique client identifier
	 * @returns {Promise<{subscribe: Function, publish: Function, disconnect: Function}>} Connection methods
	 */
	async function connect(props: { token: string; clientId: string }) {
		const connection = await $connect({ ...props, ...superProps });

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
