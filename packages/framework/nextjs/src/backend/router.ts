import { notFound } from "next/navigation.js";

import cacheDelete from "./cache/delete.js";
import cacheRetrieve from "./cache/retrieve.js";
import cacheUpsert from "./cache/upsert.js";
import deviceInfo from "./device/info.js";
import deviceRegister from "./device/register.js";
import deviceUnregister from "./device/unregister.js";
import changesGet from "./changes/get.js";
import changesAdd from "./changes/add.js";
import changeCapture from "./changeCapture/index.js";

type NextContext = { params: { slug: string[] } };

const RestEndpoints = {
	GET: {
		"/changes": changesGet,
		"/device": deviceInfo,
		"/cache": cacheRetrieve,
	},
	POST: {
		"/changes": changesAdd,
		"/device": deviceRegister,
		"/cache": cacheUpsert,
		"/changeCapture": changeCapture,
	},
	DELETE: {
		"/device": deviceUnregister,
		"/cache": cacheDelete,
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
	const path = `/${context.params.slug.join("/")}`;
	const isValidPath = Object.keys(endpoints).includes(path);
	if (!isValidPath) return notFound();

	// @ts-expect-error
	const func = endpoints[path];
	return func;
}
