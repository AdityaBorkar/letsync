import { NextResponse } from "next/server.js";
import type { Params } from "../../handlers.js";

export default async function changeCapture(params: Params) {
	const { database: serverDb } = params;
	await serverDb.waitUntilReady();
	if (serverDb.type === "NOSQL") return NextResponse.json({});

	const auth = params.request.headers.get("Authorization");
	if (auth !== "Basic ZFB5emZSMlFSTkNQTVR1U1VaZjVVT3BFeVNkcG03OWE=")
		return NextResponse.json(
			{ error: "Invalid Authorization" },
			{ status: 401 },
		);

	const input = await params.request.json();
	// TODO: Zod verify `input`
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const cdc = input.payload as unknown as any[];

	console.log({
		payload: JSON.stringify(input, null, 4),
	});

	// Duplicate messages are possible
	// Changefeeds do not support total message ordering or transactional ordering of messages.

	// TODO: How to order the data?
	// TODO: How to prevent duplicates?

	const cdcData = cdc
		.map((payloadItem) => {
			const { after, key, topic, updated } = payloadItem;
			const userGroup = topic.split(".")[0].replaceAll('"', ""); // TODO: Improve logic, does not work for `"vasundhara.aakash".public.employees`
			const tableName = topic.split(".")[2]; // TODO: Improve logic, does not work for `"vasundhara.aakash".public.employees`

			params.pubsub.publish(userGroup, after);

			const data = [
				`'${after.id}'`,
				`'${tableName}'`,
				`'${key}'`,
				`'${JSON.stringify(after)}'`,
				`'epoch' + (${Number.parseInt(updated)}::float/10000000000)::interval`, // TODO - THIS TIMESTAMP IS NOT CORRECT.
			];
			return `(${data.join(", ")})`;
		})
		.join(", ");
	await serverDb.query(
		`INSERT INTO cdc (id, tableName, key, data, updated) VALUES ${cdcData};`,
	);

	return NextResponse.json({});
}
