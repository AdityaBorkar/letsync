# Contributing

We are a small community of contributors. We accept open source contributions, but before you start working, kindly contact the maintainers.

## Where to ask Questions?

Right now, we are a small community, hence we haven't created a Discord Server. Ask your questions directly on X or GitHub Discussions. DM / Tag me.

## Tech Stack

- Bun (to be replaced with Deno. Refer `roadmap/CHECKLIST_deno.md`)
- NPM Workspaces
- Publishing to NPM and JSR
- Linting
  - Lint JSDocs
  - Lint JSON
  - Lint ESLint
    Lint JSON	--exclude-lint-json			💯
    Lint Knip	--exclude-lint-knip		✅	💯
    Lint MD	--exclude-lint-md			💯
    Lint Package JSON	--exclude-lint-package-json			💯
    Lint Packages	--exclude-lint-packages
    Lint Perfectionist	--exclude-lint-perfectionist
    Lint Regex	--exclude-lint-regex
    Lint Spelling	--exclude-lint-spelling
    Lint Strict	--exclude-lint-strict
    Lint Stylistic	--exclude-lint-stylistic
    Lint YML	--exclude-lint-yml
    Linting	
- Conventional Commits - https://www.conventionalcommits.org/en/v1.0.0/

## Flows for this Repository:

// TODO - On Code Merge
// bun nx sync
// bun run format
// git commit -m "chore(release): {version}"
// bun run lint
// bun run check-types
// bun run build
// git commit -m "chore(release): {version}"
// bun run release
// --
// ! What if conventional commit message is not followed?

- Semantic Versioning
- Direct commits to the `develop` branch.
- Open a PR for publish in the `experimental` branch with auto-versioning. Squash merge.
- Open a PR for publish in the `stable` branch with auto-versioning. Squash merge.

- Releases
- Deployments
  - Preview
  - Production

> Note: you can create feature-based branches and merge them to `develop` branch.
> `stable` and `experimental` branches are write protected. No direct commits allowed. Only PRs allowed.

-----------------------------------------------------------

GitHub Actions workflows are added for each of the enabled tooling pieces to run them in CI.
On the GitHub repository, metadata will be populated:
Issue labels for issue areas, statuses, and types.
Repository settings such as branch protections and squash merging PRs

- [] Build Process / GitHub Workflows
  - [] Packages Size
  - [] Testing Results
  - [] Changelog
  - [] Versioning
[ ] Migrate to Biome
[ ] Publishing
    [ ] Publish on JSR
    [ ] Publish on NPM
[ ] Vitest Tests
[ ] Website Deployment
[ ] Boilerplates
[ ] Examples
[ ] Write hints for cursorrules

## Limitations

- We are using BiomeJS v1.9.x. It has the following limitations:
  - No extensions available
  - HTML: Parsing and Formatting IN PROGRESS. Linting NOT SUPPORTED.
  - Astro: Parsing, Formatting and Linting are PARTIALLY SUPPORTED.
  - YAML: Parsing IN PROGRESS. Formatting and Linting NOT SUPPORTED.
  - Markdown: Parsing IN PROGRESS. Formatting and Linting NOT SUPPORTED.
- We are using Bun.