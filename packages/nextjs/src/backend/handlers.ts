import type { NextRequest } from "next/server.js";
import type {
	ReplocalConfig,
	Replocal_PubSub,
	Replocal_ServerDb,
} from "@replocal/core";

import Auth from "./auth.js";
import Router from "./router.js";

export type Params = {
	request: NextRequest;
	config: ReplocalConfig;
	pubsub: Replocal_PubSub;
	serverDb: Replocal_ServerDb;
	auth: {
		userId: string;
		deviceId: string;
	};
};

export type NextContext = { params: { slug: string[] } };

export function ReplocalHandlers(props: {
	config: ReplocalConfig;
	pubsub: Replocal_PubSub;
	serverDb: Replocal_ServerDb;
}) {
	// TODO - ZOD VERIFY `props`

	return {
		async GET(request: NextRequest, context: NextContext) {
			const func = Router({ context, method: "GET" });
			const auth = Auth(request);
			const params = { request, auth, ...props };
			return await func(params);
		},
		async POST(request: NextRequest, context: NextContext) {
			const func = Router({ context, method: "POST" });
			const auth = Auth(request);
			const params = { request, auth, ...props };
			return await func(params);
		},
		async DELETE(request: NextRequest, context: NextContext) {
			const func = Router({ context, method: "DELETE" });
			const auth = Auth(request);
			const params = { request, auth, ...props };
			return await func(params);
		},
	};
}
