import cacheDelete from "./cache/delete.js";
import cacheRetrieve from "./cache/retrieve.js";
import cacheUpsert from "./cache/upsert.js";
import deviceRegister from "./device/register.js";
import deviceUnregister from "./device/unregister.js";
import changesGet from "./db/changes/get.js";
import changesAdd from "./db/changes/add.js";
import changeCapture from "./db/cdc/index.js";
import databaseInit from "./db/init/index.js";
import changesStatus from "./db/changes/status.js";

type NextContext = { params: { slug: string[] } };

const RestEndpoints = {
	GET: {
		// "/cache": cacheRetrieve,
		"/db/changes/status": changesStatus,
		"/db/changes": changesGet,
		"/db/init": databaseInit,
	},
	POST: {
		// "/cache": cacheUpsert,
		"/db/changes": changesAdd,
		"/db/cdc": changeCapture,
		"/device": deviceRegister,
	},
	DELETE: {
		// "/cache": cacheDelete,
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
	const path = `/${context.params.slug.join("/")}`;
	const isValidPath = Object.keys(endpoints).includes(path);
	if (!isValidPath) return undefined;

	// @ts-expect-error
	const func = endpoints[path];
	return func;
}
