import type { Client } from 'pg';

export function PrismaCockroachDB(client: Client) {
	console.log('CockroachDB');
	// TODO - PGLITE
	const client = new PrismaClient(client);
	return {
		schema: null,
	};
}
