import type { FieldOptions } from './common.js';

export function string(props?: FieldOptions<string> & { length?: number }) {
	console.log({ props });
	return {
		sql: 'string',
	};
}

export function number(props?: FieldOptions<number>) {
	console.log({ props });
	return {
		sql: 'number',
	};
}

export function timestamp(
	props?: FieldOptions<Date> & { date?: boolean; time?: boolean },
) {
	console.log({ props });
	return {
		sql: 'timestamp',
	};
}

export function json(props?: FieldOptions<Record<string, unknown>>) {
	console.log({ props });
	return {
		sql: 'json',
	};
}

export function ref(props?: FieldOptions<string>) {
	console.log({ props });
	// !
	return {
		sql: 'ref',
	};
}
