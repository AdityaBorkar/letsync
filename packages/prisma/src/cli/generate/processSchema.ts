import type { Model } from '@mrleebo/prisma-ast';
import { createPrismaSchemaBuilder } from '@mrleebo/prisma-ast';
import chalk from 'chalk';
import { Console } from './utils.js';

const IGNORE_BLOCKS = ['generator', 'datasource'];

export function processSchema({
	letsync,
	schemas,
}: {
	letsync: LetsyncConfig[];
	schemas: {
		path: string;
		content: string;
	}[];
}) {
	letsync;

	for (const schema of schemas) {
		let builder = '';

		const ast = createPrismaSchemaBuilder(schema.content);
		const blocks = ast.getSchema().list;
		for (const block of blocks) {
			if (IGNORE_BLOCKS.includes(block.type)) {
				console.log(
					chalk.bgBlue('[LETSYNC]'),
					chalk.gray(`Ignoring block "${block.type}" from`),
					chalk.green(schema.path),
				);
			} else if (block.type === 'comment') builder += `\n${block.text}`;
			else if (block.type === 'break') builder += '\n';
			else if (block.type === 'enum') {
				// TODO - Auto-include if referenced by model
				Console.error('Enums are not implemented yet!');
			} else if (block.type === 'type') {
				// TODO - Auto-include if referenced by model
				Console.error('Types are not implemented yet!');
			} else if (block.type === 'view') {
				// TODO - Auto-include if referenced by model
				Console.error('Views are not implemented yet!');
			} else if (block.type === 'model') {
				builder += processModel(block);
			} else {
				// console.log(block);
				break;
			}
		}

		// console.log(builder);

		// for (const schema of schemas) {
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
		// }
	}

	// TODO - THROW WARNINGS FOR UNKNOWN OPTIONS
	return [];
}

function processModel(block: Model) {
	const builder = createPrismaSchemaBuilder('');
	builder.model(block.name);

	const blocks = {
		client: [],
		server: [],
		common: [],
	};

	const blockLetsyncProperties = {
		type: 'client-block', // 'client-model'
	};

	block.properties.map((property) => {
		// console.log(property);

		if (property.type === 'break') {
			console.log('START NEW BLOCK');
		}

		if (property.type === 'break') {
			console.log('END BLOCK');
		}

		if (property.type === 'comment') {
			console.log('COMMENT');
		}

		// property.type === "attribute"
		// property.type === "field"

		// if (["@@server-model", "@@client-model"].includes(property.name)) {
		// 	builder.model(property.name);
		// }

		blocks;
	});

	return builder.print();
}
