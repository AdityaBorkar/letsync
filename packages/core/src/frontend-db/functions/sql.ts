interface Params {
	schema: string;
	// operations: ClientDB.OperationsAdapter.SQL;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function sql<ReturnType>(props: any, params: Params) {
	console.log({ params, props });

	// TODO -
	// GRANT UPDATE ON dbo.tblTest(f1,f3) TO user1;
	// DENY UPDATE ON dbo.tblTest(f2 ) TO user1;

	// TODO - IMPLEMENT DATABASE SCHEMA PROTECTION RULES (OR ACCESS CONTROL RULES)

	return 'OK' as unknown as ReturnType; // database.sql(query);
}
