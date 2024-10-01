import { createId } from "@paralleldrive/cuid2";
import jwt from "jsonwebtoken";

import getLatestSchema from "@/utils/getLatestSchema.js";
import type { Params } from "@/backend/types.js";

export default async function deviceRegister(params: Params) {
	try {
		const { userId } = params.auth;

		const url = new URL(params.request.url);
		const orgId = url.searchParams.get("orgId");
		if (!orgId)
			return new Response(
				JSON.stringify({ error: "Organization ID is required" }),
				{ status: 400 },
			);

		const schema = await getLatestSchema(); // TODO - FROM DATABASE CACHE

		const device = {
			userId,
			cursor: null,
			deviceId: createId(),
			schemaVersion: schema.version,
		};

		const endpoints = [] as string[];

		if (params.database.type === "SQL") {
			await params.database.waitUntilReady();

			const orgData = await params.database.query(
				`SELECT * from orgs WHERE orgId = ${orgId}`,
			);

			// TODO - USE THIS TO ASSIGN ACL (PERMISSIONS)
			// TODO - CHECK IF USER EXISTS IN ORGANIZATION AND WHAT ARE THE ACL

			if (!orgData.users.includes(userId))
				return new Response(JSON.stringify({ error: "Unauthorized" }), {
					status: 401,
				});

			await params.database.query(
				`INSERT INTO devices (deviceId, userId, cursor, schemaVersion) VALUES ('${device.deviceId}', '${device.userId}', NULL, ${device.schemaVersion})`,
			);

			endpoints.push(orgId, userId);
		}

		const pubsubToken = jwt.sign(
			// TODO: Possibly add `ip-address`, `deviceId`
			{ endpoints },
			params.pubsub.secret,
			{ expiresIn: "24h" },
		);

		const response = { device, schema, pubsubToken, endpoints };
		return new Response(JSON.stringify(response), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
		});
	}
}
