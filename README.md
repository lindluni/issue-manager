# Issue Manager

This Action currently allows you to comment and close issues. The intent is that its lifecycle is managed by GitHub
events.

Example Usage:

```yaml

name: Preserve Accounts

on:
  issues:
    types:
      - opened

permissions:
  issues: write

jobs:
  preserve:
    if: contains(github.event.issue.title, 'Preserve Account')
    runs-on: ubuntu-latest
    name: Preserve Accounts
    steps:
      - name: Comment on Issue
        uses: lindluni/issue-manager@v1.0.0
        with:
          action: comment
          message: 'Thank you, I will mark your account active'
      - name: Close Issue
        uses: lindluni/issue-manager@v1.0.0
        with:
          action: close
```
