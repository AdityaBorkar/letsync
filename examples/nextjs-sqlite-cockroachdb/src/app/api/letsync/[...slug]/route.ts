import { LetsyncHandlers } from '@letsync/nextjs';

import { database, pubsub } from '@/lib/letsync.server';

export const { GET, POST } = LetsyncHandlers({
	db: [database],
	fs: [],
	pubsub,
	auth(request: Request) {
		const isAuth = true;
		if (!isAuth)
			return {
				message: 'Hello World',
				statusCode: 401,
			};

		return {
			deviceId: 'vasundhara-aakash',
			userId: 'vasundhara-aakash',
		};
	},
});
