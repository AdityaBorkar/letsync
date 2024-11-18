import { backend } from '@letsync/core';

type NextContext = { params: { slug: string[] } };

const RestEndpoints = {
	GET: {
		// "/cache": cacheRetrieve,
		'/db/changes/status': backend.db.changes.status,
		'/db/changes': backend.db.changes.get,
		'/db/init': backend.db.init,
	},
	POST: {
		// "/cache": cacheUpsert,
		'/db/changes': backend.db.changes.add,
		'/db/cdc': backend.db.cdc.capture,
		'/device': backend.device.register,
	},
	DELETE: {
		// "/cache": cacheDelete,
		'/device': backend.device.unregister,
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
