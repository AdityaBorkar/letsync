---
index: 2
group: "Connections"
title: "Client DB"
description: "This is a test description"
---

TODO - MAKE THIS A TOGGLE AND LIST ALL THE AVAILABLE CONNECTORS

### List of Integration Packages

Here are the state of planned and released integrations under the @auth/_ and @next-auth/_ scope, as well as next-auth. It also includes community created and maintained integrations. Integrations listed as “Planned” are something we’d love help with! See the help needed section below.

| Name          | Maintainer | Status  | NPM Link | GitHub      | Guide Link |
| ------------- | ---------- | ------- | -------- | ----------- | ---------- |
|               |            |         |          |             |            |
| PgLite        | Replocal   | Beta    |          | Link+ Stars |            |
| IndexedDB     | Replocal   | Planned |          |             |            |
| Dixie.js      |            |         |          |             |            |
| RxDB          |            |         |          |             |            |
| TinyBase      |            |         |          |             |            |
| Instant       |            |         |          |             |            |
| Liveblocks    |            |         |          |             |            |
| Gun           |            |         |          |             |            |
| WatermelonDB  |            |         |          |             |            |
| Triplit       |            |         |          |             |            |
| Fireproof     |            |         |          |             |            |
| remoteStorage |            |         |          |             |            |
| m-ld          |            |         |          |             |            |
| trystero      |            |         |          |             |            |

Create a PR to add your package to the list above.
Kindly star the packages you use and love. It helps us a lot.

In case you are a maintainer of a package that uses @auth/core, feel free to reach out to Balázs or info@authjs.dev, if you want to collaborate on making it an official package, maintained in our repository. If you are interested in bringing @auth/core support to your favorite framework, we would love to hear from you!

### Guide for making an integration package for "Client Database"

The core functionalities of Auth.js - @auth/core - are built on top of the Web Standard Request/Response mental model, and therefore are framework-agnostic. For each framework, we provide an integration layer that allows you to use the authentication features in a way that is specific to the framework. See the list of integrations that are currently available.

We welcome contributions of new official integrations. If you are interested in creating & maintaining a new integration, please read the following guidelines.

1. Clone the template repository:

Coding styles. The source code files should:

Be written in TypeScript
Pass the linting rules of the monorepo
Have a named export exported from its main module. For example: export function ExpressAuth()
API reference documentation - We use TypeDoc for automated documentation generation. The documentation should:

Be written in JSDoc comments.
Explain how to use and configure the integration: How to do Session management, how to login/logout, how to configure the base URL.
Include a link to the official framework documentation in the reference section.
Deployed Example. This task can be in a follow-up PR. The deployed example should:

All the actions (URL) should work as expected.
Have at least one OAuth provider configured.
The example code should live under apps/examples/<framework-name>. For example: apps/examples/express.

```bash
git clone https://github.com/authjs/authjs.dev.git
```

2. Make sure you package exports the following functions with the typings:

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

2. You can export any other functions, classes, or variables that are needed to improve the developer experience.
