import { createId } from '@paralleldrive/cuid2';
import jwt from 'jsonwebtoken';

import getLatestSchema from '@/server/utils/getLatestSchema.js';
import type { Params } from '@/server/types.js';
import type { ApiRouter } from '@/types/server/ApiRouter.js';

export default async function deviceRegister(params: Params) {
	try {
		const { databases, pubsub, request, auth, acl } = params;
		const { userId } = auth;

		const device = { userId, isActive: true, deviceId: createId() };
		const metadata = decodeURI(
			new URL(request.url).searchParams.get('metadata') || '',
		);

		// TODO - SOLVE THIS
		const ACL = acl({ userId, metadata });
		if (!ACL)
			return new Response(JSON.stringify({ error: 'Unauthorized' }), {
				status: 401,
			});

		const endpoints: string[] = [
			// TODO - SOLVE THIS
			...(ACL.roles || []).map((role) => `role:${role}`),
			`user:${userId}`,
		];

		const schema = await getLatestSchema();

		const db = databases[0]; // TODO - How to select the correct database?
		if (!db)
			return new Response(JSON.stringify({ error: 'No database found' }), {
				status: 500,
			});

		await db.waitUntilReady();
		if (db.type === 'SQL') {
			await db.query(
				`INSERT INTO devices (deviceId, userId, isActive, schemaVersion) VALUES ('${device.deviceId}', '${device.userId}', TRUE, ${schema.version})`,
			);
		}

		const token = jwt.sign(
			{ userId, deviceId: device.deviceId },
			pubsub.secret,
			{ expiresIn: '24h' },
		);

		const response = {
			device,
			schema,
			pubsub: { token, endpoints },
		} satisfies ApiRouter['POST']['/device']['response'];

		return new Response(JSON.stringify(response), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
		});
	}
}
