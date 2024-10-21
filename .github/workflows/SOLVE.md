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

## Resolve

- [ ] What if conventional commit message is not followed? - REJECT MERGE
- [ ] Retire .env files
- [ ] Issue labels for issue areas, statuses, and types.
- [ ] Repository settings such as branch protections and squash merging PRs

- "lint:knip": "knip",
- "lint:md": "markdownlint \"**/*.md\" \".github/**/*.md\" --rules sentences-per-line",
- "lint:spelling": "cspell \"**\" \".github/**/*\"",
- "prepare": "husky"
