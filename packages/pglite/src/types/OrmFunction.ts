import type { PrismaClient } from '@prisma/client/scripts/default-index.js';
import type { PGlite } from '@electric-sql/pglite';

export type OrmFunction = (client: PGlite) => {
	client: PrismaClient;
	schema: null;
};
