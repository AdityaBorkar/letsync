import type { PGlite } from '@electric-sql/pglite';

export async function open(client: PGlite) {
	client.waitReady;
	return;
}
