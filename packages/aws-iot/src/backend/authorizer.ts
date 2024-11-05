import jwt from 'jsonwebtoken';

/**
 * Creates an authorizer function for AWS IoT PubSub
 * @param {Object} props - Configuration properties
 * @param {string} props.secret - Secret key used to verify JWT tokens
 * @param {string} props.prefix - Topic prefix for MQTT topics
 * @returns {Function} Async function that validates tokens and returns allowed publish/subscribe topics
 */
export function PubSubAuthorizer({
	secret,
	prefix,
}: {
	secret: string;
	prefix: string;
}): (token: string) => Promise<{
	publish: string[];
	subscribe: string[];
}> {
	/**
	 * Validates JWT token and returns allowed publish/subscribe topics
	 * @param {string} token - JWT token to validate
	 * @returns {Promise<{publish: string[], subscribe: string[]}>} Allowed publish and subscribe topics
	 */
	return async (token: string) => {
		try {
			if (!token) {
				throw new Error('No token provided');
			}
			const decoded = await jwt.verify(token, secret, {
				algorithms: ['HS256'],
			});
			console.log({ decoded });
		} catch (error) {
			console.log({ error });
			return { subscribe: [], publish: [] };
		}

		const topics = ['vasundhara-aakash'];

		return {
			publish: [], // [`${prefix}/letsync/${topic}`],
			subscribe: topics.map((topic) => `${prefix}/letsync/${topic}`),
		};
	};
}
