# Resolve

- cspell words
- biome apply all rules for linting
- knip testing
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

- [ ] What if conventional commit message is not followed? - REJECT MERGE
- [ ] Issue labels for issue areas, statuses, and types
- [ ] What if someone has to edit only one subfolder, should we run commands only for that subfolder?

- Support for git "staged changes"

- [fix it](https://github.com/amannn/action-semantic-pull-request/issues?q=Resource+not+accessible+by+integration)
