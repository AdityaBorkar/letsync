import type { ClientParams } from '../functions/create.js';
// import { Fetch } from '@/util/Fetch.js';

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface PullProps {}

export function pull(props: PullProps, params: ClientParams) {
	// const { apiUrl, database, metadata } = superProps;
	console.log({ props, params });
	// if (WRITE_LOCK) {
	// 	console.log("FAILED - WRITE LOCK IS ENABLED.");
	// 	return;
	// }
	// WRITE_LOCK = true;

	// TODO - STORE CURSOR INDEPENDENTLY OUT OF THE DEVICE
	// const cursor =
	// 	await db.sql<CursorRecord>`SELECT * FROM metadata WHERE name = 'cursor'`;
	// console.log({ cursor });

	// const CdcList = await fetcher(
	// 	`${apiUrl}/changes?cursor=${cursor}`,
	// 	"GET",
	// );

	// const CacheList = "DOWNLOAD CACHE PARALLEL";

	// let newCursor = cursor;
	// for (const cdc of CdcList) {
	// 	// TODO: Perform Operations Sequentially
	// 	// if (cdc.type === "record") {
	// 	// 	// db.push(cdc);
	// 	// 	continue;
	// 	// }
	// 	// const cache = fetcher(`CACHE-URL-S3`, "GET");
	// 	// TODO - OPERATIONS: `CACHE`
	// 	newCursor = cdc.cursor;
	// }

	// await db.sql`UPDATE metadata SET lastUpdated = ${newCursor} WHERE name = 'device'`;

	return;
	// TODO - (WRITE LOCK) RELEASE
}
