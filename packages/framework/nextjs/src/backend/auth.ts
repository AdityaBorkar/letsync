import type { NextRequest } from "next/server.js";
import { Params } from "./handlers.js";

export default function Auth(request: NextRequest) {
	// TODO - Implement Auth (user)
	const userId = "example-user-id";
	if (!userId) return new Response("Unauthorized", { status: 401 });

	// TODO - Implement Auth (device)
	const deviceId = "example-device-id";

	return { userId, deviceId };
}

// TODO - CHECK ALL ENDPOINTS
