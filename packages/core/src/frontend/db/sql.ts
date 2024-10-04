import type { Props } from "./index.js";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function sql<RT>(params: any, props: Props) {
	const { database } = props;

	// TODO -
	// GRANT UPDATE ON dbo.tblTest(f1,f3) TO user1;
	// DENY UPDATE ON dbo.tblTest(f2 ) TO user1;

	// TODO - IMPLEMENT DATABASE SCHEMA PROTECTION RULES (OR ACCESS CONTROL RULES)

	return "OK" as unknown as RT; // database.sql(query);
}
