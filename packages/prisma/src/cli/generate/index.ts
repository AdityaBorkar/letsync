import { dirname, join } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { default as prisma } from '@prisma/internals';
import chalk from 'chalk';

import { findPrismaSchemaPath, readFiles } from './utils.js';
import { processMainSchema } from './processMainSchema.js';
import { processSchema } from './processSchema.js';

export default async function generate(params: { watch: boolean }) {
	// TODO - Schema File Name cannot start with the name of the database

	// * Watch Mode
	if (params.watch)
		console.log(chalk.red('Watch Mode is not implemented yet.'));

	// * Config
	const cwd = process.cwd();
	const SCHEMA_BASE_PATH = join(cwd, '.letsync-orm');

	// * Letsync Schema
	const MainSchema = await findPrismaSchemaPath(cwd);
	if (!MainSchema) throw new Error('[LETSYNC] No schema found');
	console.log(`Generating Prisma schemas from "${MainSchema[0]}"`);
	const LETSYNC_SCHEMAS = processMainSchema(MainSchema[1]);

	// * Other Schemas
	const files = readFiles({ cwd, relativePath: 'prisma' });
	const OTHER_SCHEMAS = processSchema({
		letsync: LETSYNC_SCHEMAS.map((schema) => schema.letsync),
		schemas: files,
	});

	// * Merge Schemas
	const ALL_SCHEMAS = [...LETSYNC_SCHEMAS, ...OTHER_SCHEMAS];

	// * Format Schemas
	const ALL_SCHEMAS_FORMATTED = await prisma.formatSchema({
		schemas: ALL_SCHEMAS.map((schema) => [schema.path, schema.content]),
	});

	// * Write Files
	for await (const schema of ALL_SCHEMAS_FORMATTED) {
		const [relativePath, content] = schema;
		const path = join(SCHEMA_BASE_PATH, relativePath);
		const dir = dirname(path);
		if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
		writeFile(path, content, { flag: 'w' });
	}

	console.log(chalk.green('Schemas generated successfully.'));
	console.log('--------------------------------');
}
