import type { Props } from "./index.js";

export default function sql<RT>(
	props: Props & {
		query: string[];
	},
) {
	const { query, database } = props;

	return "OK" as unknown as RT; // database.sql(query);
}
