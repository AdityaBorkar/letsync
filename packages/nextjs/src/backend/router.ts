import { server } from '@letsync/core';

type NextContext = { params: { slug: string[] } };

// ! `EndpointFunction` is a workaround to avoid type errors
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type EndpointFunction = (req: any) => Promise<any>;

const RestEndpoints: Record<string, Record<string, EndpointFunction>> = {
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
	// @ts-expect-error
	const isValidPath = Object.keys(endpoints).includes(path);
	if (!isValidPath) return undefined;

	// @ts-expect-error
	const func = endpoints[path];
	return func;
}
