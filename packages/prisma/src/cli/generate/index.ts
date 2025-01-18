import type { Generator, Value } from '@mrleebo/prisma-ast';

import { existsSync, mkdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { default as prisma } from '@prisma/internals';
import chalk from 'chalk';
import { createPrismaSchemaBuilder } from '@mrleebo/prisma-ast';

import { getAssignmentString, isLetsyncGenerator } from './ast-utils.js';
import { findPrismaSchemaPath } from './utils.js';

export default async function generate() {
	const cwd = process.cwd();
	const MainSchema = await findPrismaSchemaPath(cwd);
	if (!MainSchema) throw new Error('[LETSYNC] No schema found');
	console.log(chalk.green(`Generating Prisma schemas from "${MainSchema[0]}"`));

	// const config = await prisma.getConfig({ datamodel: [schema] });

	// if (config.datasources.length !== 0)
	// 	throw new Error('[LETSYNC] Datasources are NOT SUPPORTED.');

	// for (const warning of config.warnings) {
	// 	console.log(chalk.yellow(warning));
	// }

	const ast = createPrismaSchemaBuilder(MainSchema[1]);
	const blocks = ast.getSchema().list;
	const generators = ast.findAllByType('generator', { within: blocks });
	const letsyncGenerators = generators.filter((generator) => {
		if (generator === null) return false;
		const valid = isLetsyncGenerator(generator);
		if (!valid) return false;
		console.log('-', chalk.blue(generator.name));
		return true;
	}) as unknown as Generator[];

	const schemas = letsyncGenerators.map((generator) => {
		const letsyncConfig: Partial<LetsyncConfig> = { name: generator.name };
		const datasource: Record<string, Value> = {};

		// * Generator Block
		// const base_builder = builder.generator(generator.name);
		let base_builder = `generator ${generator.name} {`;
		for (const block of generator.assignments) {
			if (block.type === 'break') {
				base_builder += '\n';
				// base_builder.break();
			} else if (block.type === 'comment') {
				base_builder += `\n${block.text}`;
				// base_builder.comment(block.text.slice(2));
			} else if (block.key.startsWith('datasource_')) {
				const key = block.key.replace('datasource_', '');
				datasource[key] = block.value;
				// TODO - VALIDATE PROPERTYs
			} else if (block.key.startsWith('letsync_')) {
				const key = block.key.replace('letsync_', '');
				// @ts-expect-error
				letsyncConfig[key] = block.value;
				// TODO - VALIDATE PROPERTYs
			} else {
				if (['string', 'number', 'boolean'].includes(typeof block.value)) {
					base_builder += `\n${block.key} = ${block.value}`;
				} // @ts-expect-error
				else if (block.value.type === 'array') {
					// @ts-expect-error
					base_builder += `\n${block.key} = [${block.value.args.join(', ')}]`;
				} // @ts-expect-error
				else if (block.value.type === 'function') {
					// @ts-expect-error
					base_builder += `\n${block.key} = ${block.value.name}(${block.value.params.join(', ')})`;
				} else
					throw new Error('[LETSYNC] Unknown value type: ', {
						cause: block.value,
					});
				// if (block.key.type === 'string')
				// 	base_builder.assignment(block.key, [block.key, value]);
				// else base_builder.assignment(block.key, value);
			}
		}
		base_builder += '\n}';

		// * Datasource Block
		base_builder += '\ndatasource db {';
		base_builder += `\n  provider = ${datasource.provider || ''}`;
		base_builder += `\n  url      = ${getAssignmentString(datasource.url || '')}`;
		base_builder += '\n}';

		// const ds_builder = builder.datasource(
		// 	getAssignmentString(datasource.provider || ''),
		// 	getAssignmentString(datasource.url || ''),
		// );
		// for (const key in datasource) {
		// 	if (['provider', 'url'].includes(key)) continue;
		// 	ds_builder.assignment(key, getAssignmentString(datasource[key] || ''));
		// }

		// * Prisma Schema Builder
		const builder = createPrismaSchemaBuilder(base_builder);

		// * Letsync Config Validation
		if (letsyncConfig.type === 'server' && letsyncConfig.optimistic_column_name)
			throw new Error(
				'[LETSYNC] Optimistic column name is NOT ALLOWED for server database.',
			);
		const letsync = {
			name: generator.name,
			models: letsyncConfig.models || [],
			type: letsyncConfig.type || 'server',
			common_fields:
				letsyncConfig.common_fields ||
				(letsyncConfig.type === 'server' ? 'include' : 'exclude'),
			optimistic_column_name:
				letsyncConfig.optimistic_column_name || '$optimistic',
		} satisfies LetsyncConfig;

		return { letsync, builder };
	});

	// TODO - DETECT FOLDER AND READ ALL SCHEMAS
	const files = [{ path: '', content: '' }];

	for (const block of blocks) {
		console.log(block);

		// TODO - IGNORE DATASOURCE, GENERATORS.

		// 	// 	// @ts-expect-error
		// 	// 	if (IGNORE_BLOCKS.includes(block.type)) {
		// 	// 		// continue;
		// 	// 	}
		// 	for (const schema of schemas) {
		// 		schema.model('BLANK'); // TODO - SET PARENT TO "FILE"
		// 		if (block.type === 'break') schema.break();
		// 		else if (block.type === 'comment') schema.comment(block.text);
		// 		else {
		// 			// console.log(block);
		// 			break;
		// 		}
		// 		// if (block.type === 'comment') {
		// 		// 	schema.comment(block.text);
		// 		// }
		// 		// .push(block);
		// 	}
	}

	// TODO - THROW WARNINGS FOR UNKNOWN OPTIONS

	if (!existsSync(path.join(cwd, '.letsync-orm/prisma')))
		mkdirSync(path.join(cwd, '.letsync-orm/prisma'), { recursive: true });

	for (const schema of schemas) {
		const filePath = path.join(
			cwd,
			'.letsync-orm/prisma',
			`${schema.letsync.name}.prisma`,
		);
		const [FormattedSchema] = await prisma.formatSchema({
			schemas: [[filePath, schema.builder.print()]],
		});
		if (!FormattedSchema) throw new Error('[LETSYNC] Failed to format schema');
		await writeFile(FormattedSchema[0], FormattedSchema[1], { flag: 'w' });
	}
}
