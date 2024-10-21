# Contributing

We are a small community of contributors. We accept open source contributions, but before you start working, kindly contact the maintainers.

## Where to ask Questions?

Right now, we are a small community, hence we haven't created a Discord Server. Ask your questions directly on GitHub Discussions or X (DM or tag @aditya_btech).

## Tech Stack

- Bun (to be replaced with Deno. Refer `roadmap/CHECKLIST_deno.md`)
- Nx for monorepo management
- NPM and JSR for package publishing
- Biome for linting, formatting, and organizing imports
- commitizen and cz-conventional-changelog for commit messages

We follow the following standards:

- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

Branches:

- `stable`
  - For stable releases
  - Environment = `Production`
  - Versioning = `x.y.z`
- `next`
  - For staging releases
  - Environment = `Staging`
  - Versioning = `x.y.z-next.n`
- `<feature-branch>`
  - For development purposes

> Note: You can create feature-based branches and merge them to `next` branch.
> `stable` and `next` branches are write protected. No direct commits allowed. Only PRs allowed.

## Flows for this Repository

For contributors:

- Fork the repository and create a new branch `any-name-you-want` from `next` branch.
- Direct commits to the new branch `any-name-you-want`.
- Open a PR for publish in the `next` branch. Squash merge.
- Conventional Commit Message for the PR Commit.

For maintainers:

- Open a PR for publish in the `stable` branch. Squash merge.
- Conventional Commit Message for the PR Commit.
- Release and Publish Workflows

## How to set Environment Variables for Local Development?

Write here

## Limitations

- We are using BiomeJS v1.9.x. It has the following limitations:
  - No extensions available
  - HTML: Parsing and Formatting IN PROGRESS. Linting NOT SUPPORTED.
  - Astro: Parsing, Formatting and Linting are PARTIALLY SUPPORTED.
  - YAML: Parsing IN PROGRESS. Formatting and Linting NOT SUPPORTED.
  - Markdown: Parsing IN PROGRESS. Formatting and Linting NOT SUPPORTED.
