---
index: 5
group: "Integrations"
title: "Server Database"
description: "This is a test description"
---

## Help Needed

In case you are a maintainer of a package that uses @letsync/\*, feel free to reach out to Aditya Borkar or hello@letsync.dev, if you want to collaborate on making it an official package, maintained in our repository. If you are interested in bringing @letsync/\* support to your favorite framework, we would love to hear from you! Create a PR to add your package to the list above.

## List of Integration Packages

Here are the state of planned and released integrations under the @letsync/\* scope. It also includes community created and maintained integrations.

> [!TIP]
> Integrations listed as “Planned” are something we’d love help with! See the help needed section below.

> [!IMPORTANT]
> Kindly star the packages you use and love. It helps us a lot.

### SQL Databases:

| Name        | Maintainer | Status | NPM Link | GitHub | Guide Link |
| ----------- | ---------- | ------ | -------- | ------ | ---------- |
| Supabase    | Letsync    | Beta   |          |        |            |
| PostgreSQL  |            |        |          |        |            |
| PlanetScale |            |        |          |        |            |
| Neon        |            |        |          |        |            |
| TursoDB     |            |        |          |        |            |
| CockroachDB |            |        |          |        |            |
|             |            |        |          |        |            |

### NoSQL Databases:

| Name     | Maintainer | Status | NPM Link | GitHub | Guide Link |
| -------- | ---------- | ------ | -------- | ------ | ---------- |
| DynamoDB |            |        |          |        |            |
| MongoDB  |            |        |          |        |            |
| Firebase |            |        |          |        |            |
| Prisma   |            |        |          |        |            |
| FaunaDB  |            |        |          |        |            |
|          |            |        |          |        |            |

### In-Memory Databases:

| Name    | Maintainer | Status | NPM Link | GitHub | Guide Link |
| ------- | ---------- | ------ | -------- | ------ | ---------- |
| Upstash |            |        |          |        |            |
|         |            |        |          |        |            |

### Graph Databases:

| Name | Maintainer | Status | NPM Link | GitHub | Guide Link |
| ---- | ---------- | ------ | -------- | ------ | ---------- |
|      |            |        |          |        |            |

### Vector Databases:

| Name | Maintainer | Status | NPM Link | GitHub | Guide Link |
| ---- | ---------- | ------ | -------- | ------ | ---------- |
| Gun  |            |        |          |        |            |
|      |            |        |          |        |            |

### Uncategorized Databases:

| Name      | Maintainer | Status | NPM Link | GitHub | Guide Link |
| --------- | ---------- | ------ | -------- | ------ | ---------- |
| SurrealDB |            |        |          |        |            |
|           |            |        |          |        |            |

## Guide for making an integration package for "Server Database"

To make integrations that adhere to the same mental model as `@letsync/*`, you can follow the below guide.

1. Copy the template from [https://github.com/letsync/letsync/tree/main/packages/server-database-template](https://github.com/letsync/letsync/tree/main/packages/server-database-template)

```bash
[Copy Button]

npx degit letsync/letsync/tree/main/templates/server-db my-db-name
```

2. Coding styles. The source code files should:

   - Be written in TypeScript
   - Pass the linting rules of the monorepo

3. You can export many functions, classes, or variables that shall improve the developer experience. The source code files should have the following named export exported from its main module.

```ts
export function LetsyncServerDb(props: any): LetsyncServerDb;

export type Letsync_ServerDb<DT extends unknown> = {
	__brand: "LETSYNC_SERVER_DB";
	database: DT; // This must be the instance of the database you are using
	waitUntilReady: () => Promise<void>;
} & (
	| {
			type: "SQL";
			query: (query: string) => Promise<any>;
	  }
	| {
			type: "NOSQL";
	  }
);
```

4. API reference documentation - We use TypeDoc for automated documentation generation. The documentation should:

   - Be written in JSDoc comments.
   - Explain how to use and configure the integration: How to do setup, how to configure, etc.
   - Include a link to the official documentation in the reference section.

5. Deployed Example. This task can be in a follow-up PR. The deployed example should:

   - All the actions (URL) should work as expected.
   - Have at least one OAuth provider configured.
   - The example code should live under apps/examples/<framework-name>. For example: apps/examples/express.
