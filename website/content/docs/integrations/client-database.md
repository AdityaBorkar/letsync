---
index: 4
group: "Integrations"
title: "Client Database"
description: "This is a test description"
---

## Help Needed

In case you are a maintainer of a package that uses @replocal/\*, feel free to reach out to Aditya Borkar or hello@replocal.dev, if you want to collaborate on making it an official package, maintained in our repository. If you are interested in bringing @replocal/\* support to your favorite framework, we would love to hear from you! Create a PR to add your package to the list above.

## List of Integration Packages

Here are the state of planned and released integrations under the @replocal/\* scope. It also includes community created and maintained integrations.

> [!TIP]
> Integrations listed as “Planned” are something we’d love help with! See the help needed section below.

> [!IMPORTANT]
> Kindly star the packages you use and love. It helps us a lot.

### SQL Databases:

| Name   | Maintainer | Status | NPM Link | GitHub | Guide Link |
| ------ | ---------- | ------ | -------- | ------ | ---------- |
| PgLite | Replocal   | Beta   |          |        |            |
|        |            |        |          |        |            |

### NoSQL Databases:

| Name          | Maintainer | Status  | NPM Link | GitHub      | Guide Link |
| ------------- | ---------- | ------- | -------- | ----------- | ---------- |
| Dixie.js      |            |         |          | Link+ Stars |            |
| Fireproof     |            |         |          |             |            |
| IndexedDB     | Replocal   | Planned |          |             |            |
| Instant       |            |         |          |             |            |
| JsStore       |            |         |          |             |            |
| Liveblocks    |            |         |          |             |            |
| LokiJS        |            |         |          |             |            |
| Lovefield     |            |         |          |             |            |
| m-ld          |            |         |          |             |            |
| PouchDB       |            |         |          |             |            |
| remoteStorage | Replocal   | Alpha   |          |             |            |
| RxDB          |            |         |          |             |            |
| TinyBase      |            |         |          |             |            |
| Triplit       |            |         |          |             |            |
| trystero      |            |         |          |             |            |
| WatermelonDB  |            |         |          |             |            |
| Yjs           |            |         |          |             |            |
|               |            |         |          |             |            |

### Graph Databases:

| Name | Maintainer | Status | NPM Link | GitHub | Guide Link |
| ---- | ---------- | ------ | -------- | ------ | ---------- |
| Gun  |            |        |          |        |            |
|      |            |        |          |        |            |

### Vector Databases:

| Name | Maintainer | Status | NPM Link | GitHub | Guide Link |
| ---- | ---------- | ------ | -------- | ------ | ---------- |
| Gun  |            |        |          |        |            |
|      |            |        |          |        |            |

## Guide for making an integration package for "Client Database"

To make integrations that adhere to the same mental model as `@replocal/*`, you can follow the below guide.

1. Copy the template from [https://github.com/replocal/replocal/tree/main/packages/client-database-template](https://github.com/replocal/replocal/tree/main/packages/client-database-template)

```bash
[Copy Button]

npx degit replocal/replocal/tree/main/templates/client-db my-db-name
```

2. Coding styles. The source code files should:

   - Be written in TypeScript
   - Pass the linting rules of the monorepo

3. You can export many functions, classes, or variables that shall improve the developer experience. The source code files should have the following named export exported from its main module.

```ts
export function ReplocalClientDb(props: any): ReplocalClientDb;

// import { ReplocalClientDb } from "@replocal/types";
type ReplocalClientDb = {
	__brand: "REPLOCAL_CLIENT_DB";
	database: "<This must be the instance of the database you are using>";
	close: () => Promise<void>;
	flush: () => Promise<void>;
	pull: () => Promise<void>;
	push: () => Promise<void>;
	live: (endpoints: string[]) => Promise<void>;
	device: {
		register: () => Promise<
			| undefined
			| {
					deviceId: string;
					pubsubToken: PubsubToken;
					endpoints: string[];
			  }
		>;
		deregister: () => Promise<void>;
	};
	schema: {
		validate: (schema: any) => Promise<void>;
		migrate: (schema: any) => Promise<void>;
	};
	event: {
		subscribe: (event: EventName, callback: EventCallbackFn) => Promise<void>;
		unsubscribe: (event: EventName, callback: EventCallbackFn) => Promise<void>;
	};
};

// import { PubsubToken } from "@replocal/types";
type PubsubToken = {
	value: string;
	expiresAt: number;
};

// import { EventName } from "@replocal/types";
type EventName = "device:register" | "device:deregister";

// import { EventCallbackFn } from "@replocal/types";
type EventCallbackFn = (data: any) => void;
```

4. API reference documentation - We use TypeDoc for automated documentation generation. The documentation should:

   - Be written in JSDoc comments.
   - Explain how to use and configure the integration: How to do setup, how to configure, etc.
   - Include a link to the official documentation in the reference section.

5. Deployed Example. This task can be in a follow-up PR. The deployed example should:

   - All the actions (URL) should work as expected.
   - Have at least one OAuth provider configured.
   - The example code should live under apps/examples/<framework-name>. For example: apps/examples/express.
