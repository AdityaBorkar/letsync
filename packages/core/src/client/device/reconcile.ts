import type { ClientParams } from '../functions/create.js';

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface ReconcileProps {}

export async function reconcile(props: ReconcileProps, params: ClientParams) {
	props;
	params;

	// TODO - RECONCILIATION ENGINE. CHECKS IF THE LOCAL STATE MATCHES WITH THE REMOTE STATE.
	// IF NOT, IT UPDATES THE LOCAL STATE TO MATCH THE REMOTE STATE.
}
