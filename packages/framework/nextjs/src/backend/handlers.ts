import type { NextRequest } from "next/server.js";
import type {
	Replocal_PubSub_Backend,
	Replocal_ServerDb,
} from "@replocal/types";

import Router from "./router.js";

export type Params = {
	database: Replocal_ServerDb<unknown>;
	pubsub: Replocal_PubSub_Backend;
	request: NextRequest;
	auth: {
		userId: string;
		deviceId: string;
	};
};

export type NextContext = { params: { slug: string[] } };

export function ReplocalHandlers(props: {
	database: Replocal_ServerDb<unknown>;
	pubsub: Replocal_PubSub_Backend;
	auth: (
		request: NextRequest,
	) =>
		| { userId: string; deviceId: string }
		| { message: string; statusCode: number };
}) {
	// TODO - ZOD VERIFY `props`
	const { pubsub, database, auth: Auth } = props;

	return {
		async GET(request: NextRequest, context: NextContext) {
			const func = Router({ context, method: "GET" });
			if (!func) return new Response("Not found", { status: 404 });
			const auth = Auth(request);
			if ("statusCode" in auth)
				return new Response(auth.message, { status: auth.statusCode });
			const params = { request, auth, pubsub, database };
			return await func(params);
		},
		async POST(request: NextRequest, context: NextContext) {
			const func = Router({ context, method: "POST" });
			if (!func) return new Response("Not found", { status: 404 });
			const auth = Auth(request);
			if ("statusCode" in auth)
				return new Response(auth.message, { status: auth.statusCode });
			const params = { request, auth, pubsub, database };
			return await func(params);
		},
		async DELETE(request: NextRequest, context: NextContext) {
			const func = Router({ context, method: "DELETE" });
			if (!func) return new Response("Not found", { status: 404 });
			const auth = Auth(request);
			if ("statusCode" in auth)
				return new Response(auth.message, { status: auth.statusCode });
			const params = { request, auth, pubsub, database };
			return await func(params);
		},
	};
}
