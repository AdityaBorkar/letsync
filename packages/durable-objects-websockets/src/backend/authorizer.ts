import jwt from 'jsonwebtoken';

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
