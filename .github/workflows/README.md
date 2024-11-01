# GitHub Actions Workflows

## Branches

The list of branches are:

- `stable`
- `canary` (inactive)

## Workflows

- Create a new branch from `stable`

## FAQs

### How to create a new release?

1. Create a new branch from `stable`
2. Create a new release from `stable`
3. Create a draft release from `stable` or `canary` branch with the name: "create release"

### How to deploy quick fixes or vulnerability fixes?

1. Revert `stable` branch to the previous release commit head
2. Create a new release from `stable`
3. Apply the fix
4. Create a new release from `stable` again

<!-- # - HUSKY AND COMMIT MESSAGE CHECKS -->
<!-- # - biome apply all rules for linting -->
<!-- Enable "Require Signed Commits" -->
