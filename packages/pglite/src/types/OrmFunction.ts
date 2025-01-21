import type { PGlite } from '@electric-sql/pglite';
import type { PrismaClient } from '@prisma/client/scripts/default-index.js';

export type OrmFunction = (client: PGlite) => {
	client: PrismaClient;
	schema: null;
};
