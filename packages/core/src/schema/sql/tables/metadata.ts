import { string } from '../data-types/basic.js';

export function _metadata() {
	return {
		id: string({ onCreate: () => crypto.randomUUID() }),
	};
}
