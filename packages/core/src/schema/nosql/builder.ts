import type { Config } from '@/types/index.js';

export function SchemaBuilder_NoSQL(schema: Config['schema']) {
	console.log({ schema });
	// TODO - Extend Database Schema according to user's needs
	// TODO - Migrate Schema on (Letsync Schema) update / user's extend needs
}
