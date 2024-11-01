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
- `stable-next`
  - For stable-next releases
  - Environment = `Staging`
- `canary` - WE ARE NOT USING THIS BRANCH / CANARY TAGS UNTIL V1.
  - For canary releases
  - Environment = `Production`
  - Versioning = `x.y.z-canary.n`
- `canary-next` - WE ARE NOT USING THIS BRANCH / CANARY TAGS UNTIL V1.
  - For canary-next releases
  - Environment = `Staging`
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

## Test GitHub Actions Locally

```bash
gh act -P ubuntu-latest=-self-hosted -W "./.github/workflows/release.yml" | grep --color=always -v '::'
```

# GitHub Actions Workflows

## Branches

The list of branches are:

- `stable`
- `canary`
- `<FEATURE-BRANCH>`

## FAQs

### How to create a new release?

1. Go to Github Releases
2. Create a new version
3. Set the tag to `0.0.0`
4. Set the target branch as `stable` or `canary`
5. Publish the release

### How to deploy quick fixes or vulnerability fixes?

1. Revert `stable` branch to the previous release commit head
2. Create a new release from `stable`
3. Apply the fix
4. Create a new release from `stable` again

<!-- # - HUSKY AND COMMIT MESSAGE CHECKS -->
<!-- # - biome apply all rules for linting -->
<!-- Enable "Require Signed Commits" -->
