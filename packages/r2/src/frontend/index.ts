import type { ClientPubsub } from '@letsync/core';

import $connect from './connect.js';

export function PubSub(props: {
	// authorizer: string;
	// endpoint: string;
	prefix: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	client: any;
}): ClientPubsub.Adapter {
	const superProps = props;

	async function connect(props?: { token: string; clientId: string }) {
		const connection =
			'client' in superProps
				? superProps.client
				: // @ts-expect-error - TODO
					await $connect({ ...props, ...superProps });

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
