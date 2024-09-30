import { createId } from "@paralleldrive/cuid2";
import jwt from "jsonwebtoken";
import getLatestSchema from "../utils/getLatestSchema.js";

import type { Params } from "../handlers.js";

export default async function deviceRegister(params: Params) {
	try {
		const { userId } = params.auth;

		const schema = await getLatestSchema(); // TODO - FROM DATABASE CACHE
		const device = {
			userId,
			cursor: null,
			deviceId: createId(),
			schemaVersion: schema.version,
		};

		const endpoints = [] as string[];

		if (params.database.type === "NOSQL") {
			params.database.waitUntilReady();
			params.database.query(`CREATE ${device.deviceId}`);

			endpoints.push(params.database.database.url);
		}

		const pubsubToken = jwt.sign(
			{
				endpoints,
				// TODO: Possibly add `ip-address`
			},
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
