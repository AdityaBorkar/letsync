# Resolve

- biome apply all rules for linting
- "prepare": "husky"
- GitHub Workflows + Actions + NX
  - Releases + Tags
  - Packages
  - Deployments
    - Preview / Staging
    - Production
  - Auto generate GitHub Tags and Releases, Release Notes, Changelog, NPM/JSR publish.
    "@release-it/conventional-changelog": {
      "infile": "CHANGELOG.md",
      "preset": "angular"
    }

  - [ ] Packages Size
  - [ ] Testing Results
  - [ ] Changelog
  - [ ] Versioning
  - [ ] Repository settings such as branch protections and squash merging PRs

- [ ] Retire .env files. If not possible, use [Dotenv Linter](https://dotenv-linter.github.io/#/?id=dotenv-linter)
- [fix it](https://github.com/amannn/action-semantic-pull-request/issues?q=Resource+not+accessible+by+integration)

- GitHub Workflows
  - Pull Requests
    - Automatically add labels and assignees
  - Release Workflow
    - "chore: automated changes by github actions" results in skipping status checks
    - No caching of `bun` and `nx` and `node_modules`
    - No incremental builds
    - ! `typecheck` fails because there are no builds to link packages
  - Publish Workflow
  - knip --fix
