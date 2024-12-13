---
index: 4
group: "Integrations"
title: "Client Database"
description: "This is a test description"
---

## Help Needed

In case you are a maintainer of a package that uses @letsync/*, feel free to reach out to Aditya Borkar or [hello@letsync.dev](mailto:hello@letsync.dev), if you want to collaborate on making it an official package, maintained in our repository. If you are interested in bringing @letsync/* support to your favorite framework, we would love to hear from you! Create a PR to add your package to the list above.

## List of Integration Packages

Here are the state of planned and released integrations under the @letsync/* scope. It also includes community created and maintained integrations.

> [!TIP]
> Integrations listed as "Planned" are something we'd love help with! See the help needed section below.
> [!IMPORTANT]
> Kindly star the packages you use and love. It helps us a lot.

### SQL Databases

| Name   | Maintainer | Status | NPM Link | GitHub | Guide Link |
| ------ | ---------- | ------ | -------- | ------ | ---------- |
| PgLite | Letsync    | Beta   |          |        |            |

### NoSQL Databases

| Name          | Maintainer | Status  | NPM Link | GitHub      | Guide Link |
| ------------- | ---------- | ------- | -------- | ----------- | ---------- |
| Dixie.js      |            |         |          | Link+ Stars |            |
| Fireproof     |            |         |          |             |            |
| IndexedDB     | Letsync    | Planned |          |             |            |
| Instant       |            |         |          |             |            |
| JsStore       |            |         |          |             |            |
| Liveblocks    |            |         |          |             |            |
| LokiJS        |            |         |          |             |            |
| Lovefield     |            |         |          |             |            |
| m-ld          |            |         |          |             |            |
| PouchDB       |            |         |          |             |            |
| remoteStorage | Letsync    | Alpha   |          |             |            |
| RxDB          |            |         |          |             |            |
| TinyBase      |            |         |          |             |            |
| Triplit       |            |         |          |             |            |
| trystero      |            |         |          |             |            |
| WatermelonDB  |            |         |          |             |            |
| Yjs           |            |         |          |             |            |

### Graph Databases

| Name | Maintainer | Status | NPM Link | GitHub | Guide Link |
| ---- | ---------- | ------ | -------- | ------ | ---------- |
| Gun  |            |        |          |        |            |

### Vector Databases

| Name | Maintainer | Status | NPM Link | GitHub | Guide Link |
| ---- | ---------- | ------ | -------- | ------ | ---------- |
| Gun  |            |        |          |        |            |

## Guide for making an integration package for "Client Database"

To make integrations that adhere to the same mental model as `@letsync/*`, you can follow the below guide.

1. Copy the template from [https://github.com/letsync/letsync/tree/main/packages/client-database-template](https://github.com/letsync/letsync/tree/main/packages/client-database-template)

   ```bash
   [Copy Button]

   npx degit letsync/letsync/tree/main/templates/client-db my-db-name
   ```

   Then replace the logic at the following places:

   - `src/adapter.ts`
   - Wait for the database to be ready
   - Create `ClientDb_OpsAdapter`

2. Coding styles. The source code files should:

   - Be written in TypeScript
   - Pass the linting rules of the monorepo

3. You can export many functions, classes, or variables that shall improve the developer experience. The source code files should have the following named export exported from its main module.

4. API reference documentation - We use TypeDoc for automated documentation generation. The documentation should:

   - Be written in JSDoc comments.
   - Explain how to use and configure the integration: How to do setup, how to configure, etc.
   - Include a link to the official documentation in the reference section.

5. Deployed Example. This task can be in a follow-up PR. The deployed example should:

   - All the actions (URL) should work as expected.
   - Have at least one OAuth provider configured.
   - The example code should live under apps/examples/\<framework-name\>. For example: apps/examples/express.

```ts

interface createClientDBConfig {
	name: string;
}

export function createClientDB(
	config: createClientDBConfig,
	props?: PGlite | PGliteOptions,
): ClientDB.CreateAdapter<PGlite> {}

```

<!-- ```ts
import type {
	ClientDbAdapter,
	ClientDb_OpsAdapter,
	Letsync_Config as Config,
	Letsync_PubSub_Frontend as PubsubAdapter,
} from "@letsync/core";

function DatabaseAdapter<DT extends YOUR_DATABASE_TYPE>(props: {
	database: DT;
	config: Config;
	pubsub: PubsubAdapter;
}): Promise<ClientDbAdapter<DT>>;
```

```ts
import { frontend } from "@letsync/core";

import type { PGlite } from "@electric-sql/pglite";
import type {
	ClientDbAdapter,
	ClientDb_OpsAdapter,
	Letsync_Config as Config,
	Letsync_PubSub_Frontend as PubsubAdapter,
} from "@letsync/core";

export default async function DatabaseAdapter<DT extends PGlite>(props: {
	database: DT;
	config: Config;
	pubsub: PubsubAdapter;
}): Promise<ClientDbAdapter<DT>> {
	const { database, pubsub, config } = props;

	await database.waitReady;

	const dbOpsAdapter = {
		sql: database.sql,
	} satisfies ClientDb_OpsAdapter;

	const functions = frontend.clientDb.functions({
		config: config,
		pubsub: pubsub,
		database: dbOpsAdapter,
	});

	return { __brand: "LETSYNC_CLIENT_DATABASE", database, ...functions };
}
``` -->
