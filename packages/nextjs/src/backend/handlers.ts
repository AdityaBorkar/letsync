import type { NextRequest } from 'next/server.js';
import type {
	Letsync_PubSub_Backend,
	Letsync_ServerDB,
	Letsync_ServerFS,
} from '@letsync/core';

import Router from './router.js';

export type NextContext = { params: { slug: string[] } };

/**
 * Creates handlers for HTTP methods (GET, POST, DELETE) with authentication and routing.
 *
 * @param {Object} props - The properties for the handlers.
 * @param {Letsync_ServerDb<unknown>} props.db - The database instance.
 * @param {Letsync_ServerFS<unknown>} props.fs - The filesystem instance.
 * @param {Letsync_PubSub_Backend} props.pubsub - The pub/sub backend instance.
 * @param {Function} props.auth - The authentication function that returns user and device IDs or an error message with a status code.
 *
 * @returns {Object} An object containing async functions for handling GET, POST, and DELETE requests.
 */
export function LetsyncHandlers(props: {
	db: Letsync_ServerDB<unknown> | Letsync_ServerDB<unknown>[];
	fs: Letsync_ServerFS<unknown> | Letsync_ServerFS<unknown>[];
	pubsub: Letsync_PubSub_Backend;
	auth: (
		request: NextRequest,
	) =>
		| { userId: string; deviceId: string }
		| { message: string; statusCode: 401 | 403 | 404 | 500 };
}) {
	const { db, fs, pubsub, auth: Auth } = props;

	const databases = Array.isArray(db) ? db : [db];
	for (const database of databases) {
		if (database.__brand !== 'LETSYNC_SERVER_DB')
			throw new Error('Invalid database');
	}

	const filesystems = Array.isArray(fs) ? fs : [fs];
	for (const filesystem of filesystems) {
		if (filesystem.__brand !== 'LETSYNC_SERVER_FS')
			throw new Error('Invalid filesystem');
	}

	if (pubsub.__brand !== 'LETSYNC_PUBSUB_BACKEND')
		throw new Error('Invalid pubsub');

	return {
		/**
		 * Handles GET requests.
		 *
		 * @param {NextRequest} request - The incoming request object.
		 * @param {NextContext} context - The context for the request.
		 *
		 * @returns {Promise<Response>} The response object.
		 */
		async GET(request: NextRequest, context: NextContext) {
			const func = Router({ context, method: 'GET' });
			if (!func) return new Response('Not found', { status: 404 });
			const auth = Auth(request);
			if ('statusCode' in auth)
				return new Response(auth.message, { status: auth.statusCode });
			const params = { request, auth, pubsub, databases, filesystems };
			return await func(params);
		},

		/**
		 * Handles POST requests.
		 *
		 * @param {NextRequest} request - The incoming request object.
		 * @param {NextContext} context - The context for the request.
		 *
		 * @returns {Promise<Response>} The response object.
		 */
		async POST(request: NextRequest, context: NextContext) {
			const func = Router({ context, method: 'POST' });
			if (!func) return new Response('Not found', { status: 404 });
			const auth = Auth(request);
			if ('statusCode' in auth)
				return new Response(auth.message, { status: auth.statusCode });
			const params = { request, auth, pubsub, databases, filesystems };
			return await func(params);
		},

		/**
		 * Handles DELETE requests.
		 *
		 * @param {NextRequest} request - The incoming request object.
		 * @param {NextContext} context - The context for the request.
		 *
		 * @returns {Promise<Response>} The response object.
		 */
		async DELETE(request: NextRequest, context: NextContext) {
			const func = Router({ context, method: 'DELETE' });
			if (!func) return new Response('Not found', { status: 404 });
			const auth = Auth(request);
			if ('statusCode' in auth)
				return new Response(auth.message, { status: auth.statusCode });
			const params = { request, auth, pubsub, databases, filesystems };
			return await func(params);
		},
	};
}
