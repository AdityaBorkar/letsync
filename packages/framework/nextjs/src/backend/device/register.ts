import { createId } from "@paralleldrive/cuid2";
import jwt from "jsonwebtoken";
import getLatestSchema from "../utils/getLatestSchema.js";

import type { Params } from "../handlers.js";

export default async function deviceRegister(params: Params) {
	const { userId } = params.auth;

	// TODO - PERFORM AUTHENTICATION

	const schema = await getLatestSchema(); // TODO - FROM DATABASE CACHE
	const device = {
		userId,
		state: null,
		deviceId: createId(),
		schemaVersion: schema.version,
	};
	const result = "CREATE ${deviceId}";

	// TODO - ISSUE ACCESS TOKEN

	const endpoints = [] as string[];
	const expiresAt = new Date().valueOf() + 1000 * 60 * 60 * 24; // 1 day
	const secret = params.pubsub.tokenSecret;
	const accessToken = jwt.sign({ endpoints }, secret, { expiresIn: "24h" }); // TODO: Possibly add `ip-address`

	const pubsubToken = { value: accessToken, expiresAt };

	const response = { device, schema, pubsubToken, endpoints };
	return new Response(JSON.stringify(response), { status: 200 });
}
