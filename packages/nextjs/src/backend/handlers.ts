import type { NextRequest } from 'next/server.js';
import type { Letsync_PubSub_Backend, Letsync_ServerDb } from '@letsync/core';

import Router from './router.js';

export type NextContext = { params: { slug: string[] } };

export function LetsyncHandlers(props: {
	database: Letsync_ServerDb<unknown>;
	pubsub: Letsync_PubSub_Backend;
	auth: (
		request: NextRequest,
	) =>
		| { userId: string; deviceId: string }
		| { message: string; statusCode: 401 | 403 | 404 | 500 };
}) {
	// TODO - ZOD VERIFY `props`
	const { pubsub, database, auth: Auth } = props;

	return {
		async GET(request: NextRequest, context: NextContext) {
			const func = Router({ context, method: 'GET' });
			if (!func) return new Response('Not found', { status: 404 });
			const auth = Auth(request);
			if ('statusCode' in auth)
				return new Response(auth.message, { status: auth.statusCode });
			const params = { request, auth, pubsub, database };
			return await func(params);
		},
		async POST(request: NextRequest, context: NextContext) {
			const func = Router({ context, method: 'POST' });
			if (!func) return new Response('Not found', { status: 404 });
			const auth = Auth(request);
			if ('statusCode' in auth)
				return new Response(auth.message, { status: auth.statusCode });
			const params = { request, auth, pubsub, database };
			return await func(params);
		},
		async DELETE(request: NextRequest, context: NextContext) {
			const func = Router({ context, method: 'DELETE' });
			if (!func) return new Response('Not found', { status: 404 });
			const auth = Auth(request);
			if ('statusCode' in auth)
				return new Response(auth.message, { status: auth.statusCode });
			const params = { request, auth, pubsub, database };
			return await func(params);
		},
	};
}
