import type { Replocal_PubSub_Frontend } from "@replocal/types";

import $connect from "./connect.js";

export default function PubSub_Frontend(props: {
	authorizer: string;
	endpoint: string;
	prefix: string;
}): Replocal_PubSub_Frontend {
	const superProps = props;

	async function connect(props: { token: string; clientId: string }) {
		const connection = await $connect({ ...props, ...superProps });

		async function subscribe(topic: string, callback: (data: string) => void) {
			const fullTopic = `${superProps.prefix}/replocal/${topic}`;
			await connection.subscribeAsync(fullTopic, { qos: 1 });
			connection.on("message", (fullTopic: string, payload: Buffer) => {
				if (fullTopic !== `${superProps.prefix}/replocal/${topic}`) return;
				const message = new TextDecoder("utf8").decode(new Uint8Array(payload));
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
			// TODO  - IF CONNECTION NOT READY, STORE TOPIC IN QUEUE
			const message = JSON.stringify(payload);
			const fullTopic = `${superProps.prefix}/replocal/${topic}`;
			connection.publish(fullTopic, message, { qos: 1 });
		}

		async function disconnect() {
			// TODO - TEST THIS, AI GENERATED.
			await connection.end();
		}

		return { subscribe, publish, disconnect };
	}

	return { __brand: "REPLOCAL_PUBSUB_FRONTEND", connect };
}
