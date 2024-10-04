import fetcher from "../utils/fetch.js";
import type { Props } from "./index.js";

type CursorRecord = {
	lastUpdated: string;
};

export default async function pull(props: Props) {
	const { config, database } = props;
	const apiBaseUrl = config.sync.apiBaseUrl;

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
	// 	`${apiBaseUrl}/changes?cursor=${cursor}`,
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
