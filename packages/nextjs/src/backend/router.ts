import { notFound } from "next/navigation.js";

import cacheDelete from "./cache/delete.js";
import cacheRetrieve from "./cache/retrieve.js";
import cacheUpsert from "./cache/upsert.js";
import deviceInfo from "./device/info.js";
import deviceRegister from "./device/register.js";
import deviceUnregister from "./device/unregister.js";

type NextContext = { params: { slug: string[] } };

const RestEndpoints = {
	GET: {
		"/cache": cacheRetrieve,
		// '/device': deviceInfo,
		// "/sync": () => {},
		// '/pull': () => {},
	},
	POST: {
		"/cache": cacheUpsert,
		"/device": deviceRegister,
		// "/sync": () => {},
		// "/push": () => {},
	},
	DELETE: {
		"/cache": cacheDelete,
		"/device": deviceUnregister,
	},
} as const;

export default function Router({
	context,
	method,
}: {
	context: NextContext;
	method: keyof typeof RestEndpoints;
}) {
	const endpoints = RestEndpoints[method];
	const path = "/" + context.params.slug.join("/");
	const isValidPath = Object.keys(endpoints).includes(path);
	if (!isValidPath) return notFound();

	// @ts-expect-error
	const func = endpoints[path];
	return func;
}
