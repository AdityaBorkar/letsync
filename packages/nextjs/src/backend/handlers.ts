import type { ServerDB, ServerFS, ServerPubsub } from '@letsync/core';
import type { NextRequest } from 'next/server.js';

import { server } from '@letsync/core';

type NextContext = { params: Promise<{ slug: string[] }> };

/**
 * Creates handlers for HTTP methods (GET, POST, DELETE) with authentication and routing.
 *
 * @param {Object} props - The properties for the handlers.
 * @param {ServerDB.Adapter<unknown>} props.db - The database instance.
 * @param {ServerFS.Adapter<unknown>} props.fs - The filesystem instance.
 * @param {ServerPubsub.Adapter} props.pubsub - The pub/sub backend instance.
 * @param {Function} props.auth - The authentication function that returns user and device IDs or an error message with a status code.
 *
 * @returns {Object} An object containing async functions for handling GET, POST, and DELETE requests.
 */
export function LetsyncHandlers(props: {
	db: ServerDB.Adapter<unknown> | ServerDB.Adapter<unknown>[];
	fs: ServerFS.Adapter<unknown> | ServerFS.Adapter<unknown>[];
	pubsub: ServerPubsub.Adapter;
	auth: (
		request: NextRequest,
	) =>
		| { userId: string; deviceId: string }
		| { message: string; statusCode: 401 | 403 | 404 | 500 };
}) {
	const { db, fs, pubsub, auth: Auth } = props;

	const databases = Array.isArray(db) ? db : [db];
	for (const database of databases) {
		if (database.__brand !== 'LETSYNC_SERVER_DATABASE')
			throw new Error('Invalid database');
	}

	const filesystems = Array.isArray(fs) ? fs : [fs];
	for (const filesystem of filesystems) {
		if (filesystem.__brand !== 'LETSYNC_SERVER_FS')
			throw new Error('Invalid filesystem');
	}

	// TODO - WIP
	// if (pubsub.__brand !== 'LETSYNC_PUBSUB_BACKEND')
	// 	throw new Error('Invalid pubsub');

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
			const func = await getFuncFromRouter({ context, method: 'GET' });
			if (!func) return new Response('Not found', { status: 404 });
			const auth = Auth(request);
			if ('statusCode' in auth)
				return new Response(auth.message, { status: auth.statusCode });
			const params = { request, auth, pubsub, databases, filesystems };
			const response = await func(params);
			return Response.json(response);
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
			const func = await getFuncFromRouter({ context, method: 'POST' });
			if (!func) return new Response('Not found', { status: 404 });
			const auth = Auth(request);
			if ('statusCode' in auth)
				return new Response(auth.message, { status: auth.statusCode });
			const params = { request, auth, pubsub, databases, filesystems };
			const response = await func(params);
			return Response.json(response);
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
			const func = await getFuncFromRouter({ context, method: 'DELETE' });
			if (!func) return new Response('Not found', { status: 404 });
			const auth = Auth(request);
			if ('statusCode' in auth)
				return new Response(auth.message, { status: auth.statusCode });
			const params = { request, auth, pubsub, databases, filesystems };
			const response = await func(params);
			return Response.json(response);
		},
	};
}

export default async function getFuncFromRouter<
	MT extends keyof typeof server.router,
>({
	context,
	method,
}: {
	context: NextContext;
	method: MT;
}) {
	const { slug } = await context.params;
	const endpoints = server.router[method];
	const path = `/${slug.join('/')}` as keyof typeof endpoints & string;
	const isValidPath = Object.keys(endpoints).includes(path);
	if (!isValidPath) return undefined;

	const func = endpoints[path];
	return func;
}
