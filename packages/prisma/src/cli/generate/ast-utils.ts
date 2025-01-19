import type { Value } from '@mrleebo/prisma-ast';

import chalk from 'chalk';

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

	throw new Error(
		chalk.bgBlue('[LETSYNC]') + chalk.red(' Unknown value type:'),
		{ cause: value },
	);
}
