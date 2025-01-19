---
index: 2
group: "contributing"
title: "Framework"
description: "This is a test description"
---

## List of Packages

Here are the state of planned and released integrations under the @letsync/* scope. It also includes community created and maintained integrations.

> [!TIP]
> Integrations listed as "Planned" are something we'd love help with! See the help needed section below.

> [!IMPORTANT]
> Kindly star the packages you use and love. It helps us a lot.

| Name         | Maintainer | Status | Weekly Downloads | Links 		|
| ------------ | ---------- | ------ | -------- | -------- 					|
| NextJS       | Letsync    | Alpha  | 0        | NPM, Deno, GitHub, Guide 	|      
| React        | Letsync    | Alpha  | 0        | NPM, Deno, GitHub, Guide 	|      
| React Native |            |        |          |         					|
| VueJS        |            |        |          |          					| 
| Svelte       |            |        |          |          					| 
| Angular      |            |        |          |         					|
|              |            |        |          |         					|

## Guide for making an integration package for "Client Database"

To make integrations that adhere to the same mental model as `@letsync/*`, you can follow the below guide.

1. Copy the template from [https://github.com/letsync/letsync/tree/main/templates/framework](https://github.com/letsync/letsync/tree/main/templates/framework)

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

<!-- ```ts
export function LetsyncFramework(props: any): LetsyncFramework;

// import { LetsyncFramework } from "@letsync/core";
type LetsyncFrameworkDb = {
	__brand: "LETSYNC_Framework_DB";
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

// import { PubsubToken } from "@letsync/core";
type PubsubToken = {
	value: string;
	expiresAt: number;
};

// import { EventName } from "@letsync/core";
type EventName = "device:register" | "device:deregister";

// import { EventCallbackFn } from "@letsync/core";
type EventCallbackFn = (data: any) => void;
``` -->