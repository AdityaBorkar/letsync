export default function waitUntilReady() {
	const { db } = globalThis.replocal;
	return new Promise<boolean>((resolve) => {
		db.waitReady.then(() => resolve(true));
	});
}
