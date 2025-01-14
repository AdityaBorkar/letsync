import { string } from '../data-types/basic.js';

export function _devices() {
	return {
		id: string({ onCreate: () => crypto.randomUUID() }),
	};
}
