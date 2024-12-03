import { string } from '../data-types/basic.js';

export function _schema() {
	return {
		id: string({ onCreate: () => crypto.randomUUID() }),
	};
}
