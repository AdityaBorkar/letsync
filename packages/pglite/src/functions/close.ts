import type { PGlite } from '@electric-sql/pglite';

export function close(client: PGlite) {
	return client.close();
}
