import type { PGlite } from '@electric-sql/pglite';

export async function init(client: PGlite) {
	client.waitReady;
	return;
}
