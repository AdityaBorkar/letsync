---
index: 4
group: "contributing"
title: "Client Database"
description: "This is a test description"
---

## List of Integration Packages

Here is the current status of planned and released integrations under the @letsync/* scope. This list also includes integrations created and maintained by the community.

> [!TIP]
> Integrations marked as "Planned" are areas where we would greatly appreciate your help!

| **Name**       | **Type** | **Maintainer** | **Status** | Weekly Downloads	| **Links**                  |
|----------------|----------|----------------|------------|---------------------|----------------------------|
| **PGlite**     | SQL      | Letsync        | Alpha      | 0					| NPM, Deno, GitHub, Guide   |
| **IndexedDB**  | NoSQL    | Letsync        | Planned    | 0					| NPM, Deno, GitHub, Guide   |
| 		         | 		    |                |            | 					|							 |
<!-- | **remoteStorage** | NoSQL | Letsync        | Alpha      | 0					| NPM, Deno, GitHub, Guide   | -->
<!-- | **Dixie.js**   | NoSQL    |                |            | 0					| NPM, Deno, GitHub, Guide   | -->
<!-- | **Fireproof**  | NoSQL    |                |            | 0					| NPM, Deno, GitHub, Guide   | -->
<!-- | **Instant**    | NoSQL    |                |            | 0					| NPM, Deno, GitHub, Guide   | -->
<!-- | **JsStore**    | NoSQL    |                |            | 0					| NPM, Deno, GitHub, Guide   | -->
<!-- | **Liveblocks** | NoSQL    |                |            | 0					| NPM, Deno, GitHub, Guide   | -->
<!-- | **LokiJS**     | NoSQL    |                |            | 0					| NPM, Deno, GitHub, Guide   | -->
<!-- | **Lovefield**  | NoSQL    |                |            | 0					| NPM, Deno, GitHub, Guide   | -->
<!-- | **m-ld**       | NoSQL    |                |            | 0					| NPM, Deno, GitHub, Guide   | -->
<!-- | **PouchDB**    | NoSQL    |                |            | 0					| NPM, Deno, GitHub, Guide   | -->
<!-- | **RxDB**       | NoSQL    |                |            | 0					| NPM, Deno, GitHub, Guide   | -->
<!-- | **TinyBase**   | NoSQL    |                |            | 0					| NPM, Deno, GitHub, Guide   | -->
<!-- | **Triplit**    | NoSQL    |                |            | 0					| NPM, Deno, GitHub, Guide   | -->
<!-- | **trystero**   | NoSQL    |                |            | 0					| NPM, Deno, GitHub, Guide   | -->
<!-- | **WatermelonDB** | NoSQL  |                |            | 0					| NPM, Deno, GitHub, Guide   | -->
<!-- | **Yjs**        | NoSQL    |                |            | 0					| NPM, Deno, GitHub, Guide   | -->
<!-- | **Gun**        | Graph    |                |            | 0					| NPM, Deno, GitHub, Guide   | -->
<!-- | **Gun**        | Vector   |                |            | 0					| NPM, Deno, GitHub, Guide   | -->

## Guide for integrating a "Client Database"

To make integrations that adhere to the same mental model as `@letsync/*`, you can follow the below guide.

1. Copy the template from [https://github.com/AdityaBorkar/letsync/tree/stable/templates/client-database](https://github.com/AdityaBorkar/letsync/tree/stable/templates/client-database)

   ```bash
   [Copy Button]

   npx degit AdityaBorkar/letsync/tree/stable/templates/client-database my-db-name
   ```

   Then replace the logic at the following places:

   - `src/adapter.ts`
   - Wait for the database to be ready
   - Create `ClientDb_OpsAdapter`

2. Coding styles. The source code files should:

   - Be written in TypeScript
   - Pass the linting rules of the monorepo (Biome)
   - Unused code shall be flagged using Knip
   - Spell check using CSpell

3. You can export many functions, classes, or variables that shall improve the developer experience. The source code files should have the following named export exported from its main module.

4. API reference documentation - We use TypeDoc for automated documentation generation. The documentation should:

   - Be written in JSDoc comments.
   - Explain how to use and configure the integration: How to do setup, how to configure, etc.
   - Include a link to the official documentation in the reference section.

5. Deployed Example. This task can be in a follow-up PR. The deployed example should:

   - All the actions (URL) should work as expected.
   - Have at least one OAuth provider configured.
   - The example code should live under apps/examples/\<framework-name\>. For example: apps/examples/express.

6. You can choose to maintain the package as community or integrate it into the monorepo.
