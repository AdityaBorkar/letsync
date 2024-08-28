const ReplocalOrm = {
	process(schema: string) {
		//  TODO: Validate
		// TODO: Spit out 2 schemas
		return {
			localSchema: schema,
			serverSchema: schema,
		};
	},
};

const ReplocalNextjs = {
	init(schema) {
		return {
			endpoints: {
				GET() {},
				POST() {},
				PUT() {},
				DELETE() {},
				OPTIONS() {},
			},
			useReplocal: () => {
				return {
					query(query: string) {},
					subscribe(query: string) {},
				};
			},
			replocal: {
				query(query: string) {},
				subscribe(query: string) {
					// TODO: is this needed?
				},
			},
		};
	},
};

// ---

const dbSchema = "schema";

// const schema = ReplocalOrm.process(dbSchema);
// const { endpoints, useReplocal } = Replocal.init({ schema });

const { localSchema, serverSchema } = ReplocalOrm.process(dbSchema);
const { endpoints, useReplocal, replocal } = ReplocalNextjs.init({
	auth: {
		// TODO - IMPLEMENT AUTH
	},
	logger: {},
	serverDb: {
		schema: serverSchema,
	},
	localDb: {
		schema: localSchema,
	},
});

export {
	endpoints, // Expose endpoints to the user
	replocal, // To use replocal on server-side
	useReplocal, // To use replocal on client-side
};

// TODO - Execute Schema Transformations on Server dbSchema.serverSchema

// TODO - Separate Suggestions:
// - local pages using service worker (no server trip)
// - check for updates to schema

// ---
// src/app/api/replocal/[...slug]/route.ts
// export { endpoints } from "@/replocal";
