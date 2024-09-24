export default async function close() {
	await globalThis.replocal.db.close();
}
