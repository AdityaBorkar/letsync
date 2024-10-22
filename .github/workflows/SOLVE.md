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
- [ ] Retire .env files

- [ ] What if conventional commit message is not followed? - REJECT MERGE
- [ ] Issue labels for issue areas, statuses, and types
