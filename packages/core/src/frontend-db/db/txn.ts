import type { Props } from './index.js';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function txn(props: Props & { tx: any }) {
	console.log({ props });
}
