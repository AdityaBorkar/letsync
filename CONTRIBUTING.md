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
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

Branches:

- `stable`
  - For stable releases
  - Environment = `Production`
  - Versioning = `x.y.z`
- `canary` - WE ARE NOT USING THIS BRANCH / CANARY TAGS UNTIL V1.
  - For canary releases
  - Environment = `Production`
  - Versioning = `x.y.z-canary.n`
- `<FEATURE-BRANCH>`
  - For development purposes

> `stable` and `canary` branches are write protected. You cannot directly push to them. Only PRs are allowed.

## How to Contribute?

For contributors:

- Fork the repository
- Create a new branch `feature-name` from `stable` or `canary` branch.
- Commit your changes to the new branch `feature-name`.
- Open a new Pull Request to merge `feature-name` into `stable` or `canary` branch.
- PR title must validate Conventional Commit Format.
- Squash and merge into `stable` or `canary` branch.

## How to Release?

- Go to Github Releases
- Create a new version
- Create a new tag `trigger.release`
- Set the target branch as `stable` or `canary`
- Publish the release

## FAQs

- How to set Environment Variables for Local Development?
  - Write here
- How to deploy quick fixes or vulnerability fixes?
  1. Revert `stable` branch to the previous release commit head
  2. Create a new release from `stable`
  3. Apply the fix
  4. Create a new release from `stable` again
- How to test GitHub Actions Locally?
  - `gh act -P ubuntu-latest=-self-hosted -W "./.github/workflows/release.yml" | grep --color=always -v '::'`

## Limitations

- We are using BiomeJS v1.9.x. It has the following limitations:
  - No extensions available
  - HTML: Parsing and Formatting IN PROGRESS. Linting NOT SUPPORTED.
  - Astro: Parsing, Formatting and Linting are PARTIALLY SUPPORTED.
  - YAML: Parsing IN PROGRESS. Formatting and Linting NOT SUPPORTED.
  - Markdown: Parsing IN PROGRESS. Formatting and Linting NOT SUPPORTED.

<!-- # - HUSKY AND COMMIT MESSAGE CHECKS -->
<!-- # - biome apply all rules for linting -->
<!-- Enable "Require Signed Commits" -->
