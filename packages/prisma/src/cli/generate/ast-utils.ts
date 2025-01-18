import type { Generator, Value } from '@mrleebo/prisma-ast';

import chalk from 'chalk';

export function isLetsyncGenerator(generator: Generator) {
	const provider = generator.assignments.filter(
		(block) =>
			block.type === 'assignment' &&
			block.key === 'provider' &&
			block.value === '"prisma-client-js"',
	);
	if (provider.length === 0) {
		console.log(
			chalk.bgBlue('[LETSYNC]'),
			chalk.gray(
				chalk.bold(generator.name),
				`is skipped because it is not a 'prisma-client-js' generator.`,
			),
		);
		return false;
	}

	const letsyncType = generator.assignments.filter(
		(block) => block.type === 'assignment' && block.key === 'letsync_type',
	);
	if (letsyncType.length === 0) {
		console.log(
			chalk.bgBlue('[LETSYNC]'),
			chalk.gray(
				chalk.bold(generator.name),
				`is skipped because 'letsync_type' is not defined.`,
			),
		);
		return false;
	}

	return true;
}

export function getAssignmentString(value: Value) {
	if (['string', 'number', 'boolean'].includes(typeof value)) {
		return value.toString().slice(1, -1);
	}

	// @ts-expect-error
	if (value.type === 'array') {
		// @ts-expect-error
		return `[${value.args.join(', ')}]`;
	}

	// @ts-expect-error
	if (value.type === 'function') {
		// @ts-expect-error
		return `${value.name}(${value.params.join(', ')})`;
	}

	throw new Error('[LETSYNC] Unknown value type: ', { cause: value });
}
