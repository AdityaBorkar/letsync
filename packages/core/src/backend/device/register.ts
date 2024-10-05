import { createId } from "@paralleldrive/cuid2";
import jwt from "jsonwebtoken";

import getLatestSchema from "@/backend/utils/getLatestSchema.js";
import type { Params } from "@/backend/types.js";
import type { ApiRouter } from "@/types/ApiRouter.js";

export default async function deviceRegister(params: Params) {
	try {
		const { database, pubsub, request, auth, acl } = params;
		const { userId } = auth;

		const device = { userId, isActive: true, deviceId: createId() };
		const metadata = decodeURI(
			new URL(request.url).searchParams.get("metadata") || "",
		);

		const ACL = acl({ userId, metadata });
		if (!ACL)
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
			});

		const endpoints: string[] = [
			...(ACL.roles || []).map((role) => `role:${role}`),
			`user:${userId}`,
		];

		const schema = await getLatestSchema(); // TODO - FROM DATABASE CACHE

		await params.database.waitUntilReady();
		if (database.type === "SQL") {
			await database.query(
				`INSERT INTO devices (deviceId, userId, isActive, schemaVersion) VALUES ('${device.deviceId}', '${device.userId}', TRUE, ${schema.version})`,
			);
		}

		const token = jwt.sign(
			// TODO: Possibly add `ip-address`, `deviceId`
			{ endpoints },
			pubsub.secret,
			{ expiresIn: "24h" },
		);

		const response = {
			device,
			schema,
			pubsub: { token, endpoints },
		} satisfies ApiRouter["POST"]["/device"]["response"];

		return new Response(JSON.stringify(response), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
		});
	}
}
