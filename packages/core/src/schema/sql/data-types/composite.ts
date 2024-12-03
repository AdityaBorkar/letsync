import type { FieldOptions } from './common.js';

export function array(props?: FieldOptions<unknown[]>) {
	console.log({ props });
	return {
		sql: 'array',
	};
}
