import { PrismaClient } from '@prisma/client';
import type { Client } from 'pg';

export function PrismaCockroachDB(client: Client) {
	console.log('CockroachDB');
	// TODO - PGLITE
	const prismaClient = new PrismaClient(client);
	return {
		schema: null,
	};
}
