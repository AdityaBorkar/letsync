import { NextResponse } from "next/server.js";
import type { Params } from "../handlers.js";

export default async function changeCapture(params: Params) {
	const { serverDb } = params;

	const auth = params.request.headers.get("Authorization");
	if (auth !== "Basic ZFB5emZSMlFSTkNQTVR1U1VaZjVVT3BFeVNkcG03OWE=")
		return NextResponse.json(
			{ error: "Invalid Authorization" },
			{ status: 401 },
		);

	const input = await params.request.json();
	// TODO: Zod verify `input`
	const cdc = input.payload as unknown as any[];

	console.log({
		cdc,
		payloadJson: JSON.stringify(input, null, 4),
	});

	// Duplicate messages are possible
	// Changefeeds do not support total message ordering or transactional ordering of messages.

	// TODO: How to order the data?
	// TODO: How to prevent duplicates?

	if (serverDb.type === "NOSQL") return NextResponse.json({});

	const cdcData = cdc
		.map((payloadItem) => {
			const { after, key, topic, updated } = payloadItem;
			const data = [after.id, topic, key, JSON.stringify(after), updated];
			return `('${data.join("', '")}')`;
		})
		.join(", ");
	console.log(
		`INSERT INTO cdc (id, tableName, key, data, updated) VALUES ${cdcData};`,
	);
	await serverDb.query(
		`INSERT INTO cdc (id, tableName, key, data, updated) VALUES ${cdcData};`,
	);

	// TODO - MQTT

	return NextResponse.json({});
}
