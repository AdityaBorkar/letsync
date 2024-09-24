import type { NextRequest } from "next/server.js";
import type {
	Replocal_Config,
	Replocal_PubSub_Backend,
	Replocal_ServerDb,
} from "@replocal/types";

import Auth from "./auth.js";
import Router from "./router.js";

export type Params = {
	request: NextRequest;
	config: Replocal_Config;
	pubsub: Replocal_PubSub_Backend;
	database: Replocal_ServerDb<unknown>;
	auth: {
		userId: string;
		deviceId: string;
	};
};

export type NextContext = { params: { slug: string[] } };

export function ReplocalHandlers(props: {
	config: Replocal_Config;
	pubsub: Replocal_PubSub_Backend;
	database: Replocal_ServerDb<unknown>;
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
