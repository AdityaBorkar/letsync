import mqtt from 'mqtt';

export default async function connect(props: {
	token: string;
	clientId: string;
	endpoint: string;
	authorizer: string;
	prefix: string;
}) {
	return new Promise<mqtt.MqttClient>((resolve, reject) => {
		const connection = mqtt.connect(
			`wss://${props.endpoint}/mqtt?x-amz-customauthorizer-name=${props.authorizer}`,
			{
				protocolVersion: 5,
				manualConnect: true,
				username: '',
				password: props.token,
				clientId: `device_${props.clientId}`,
			},
		);

		connection.on('connect', async () => {
			resolve(connection);
		});

		connection.on('error', async (error) => {
			console.error('Error connecting to MQTT', error);
			reject();
		});

		connection.connect();
	});
}
