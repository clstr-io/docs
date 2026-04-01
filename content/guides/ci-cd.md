---
title: CI/CD
weight: 2
---

# CI/CD

Run `clstr` tests automatically in GitHub Actions.

## GitHub Actions

Add `.github/workflows/clstr.yaml` to your repository:

```yaml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: clstr-io/test@main
```

The action runs `clstr test` on every push to main and on pull requests.

### Custom Working Directory

If your `clstr.yaml` isn't at the repository root:

```yaml
- uses: clstr-io/test@main
  with:
    working-directory: './my-challenge'
```
