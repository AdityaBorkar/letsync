import { server } from '@letsync/core';

type NextContext = { params: { slug: string[] } };

const RestEndpoints = {
	GET: {
		// "/cache": cacheRetrieve,
		'/db/changes/status': server.db.changes.status,
		'/db/changes': server.db.changes.get,
		'/db/init': server.db.init,
	},
	POST: {
		// "/cache": cacheUpsert,
		'/db/changes': server.db.changes.add,
		'/db/cdc': server.db.cdc.capture,
		'/device': server.device.register,
	},
	DELETE: {
		// "/cache": cacheDelete,
		'/device': server.device.unregister,
	},
} as const;

export default function Router<MT extends keyof typeof RestEndpoints>({
	context,
	method,
}: {
	context: NextContext;
	method: MT;
}) {
	const endpoints = RestEndpoints[method];
	const path = `/${context.params.slug.join('/')}` as keyof typeof endpoints &
		string;
	const isValidPath = Object.keys(endpoints).includes(path);
	if (!isValidPath) return undefined;

	const func = endpoints[path];
	return func;
}
