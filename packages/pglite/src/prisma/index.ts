// import type { ClientDB, ClientPubsub, Schema } from '@letsync/core';
// import type { PGliteOptions } from '@electric-sql/pglite';
import type { PGlite } from '@electric-sql/pglite';

import { PrismaPGlite as OrmAdapter } from 'pglite-prisma-adapter';
// @ts-ignore
import { PrismaClient } from '@prisma/client';

export function PrismaPGlite(pglite: PGlite) {
	const adapter = new OrmAdapter(pglite);
	const client = new PrismaClient({ adapter });
	const schema = 'DEBUG'; // TODO: WIP
	return { client, schema };
}
