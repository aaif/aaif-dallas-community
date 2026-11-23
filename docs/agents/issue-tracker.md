# Issue Tracker: GitHub

Issues and specifications for this repository live in
`aaif/aaif-dallas-community`. Use the `gh` CLI inside this clone.

## Commands

- Verify the target: `gh repo view --json nameWithOwner`
- Create: `gh issue create --title "<title>" --body "<body>"`
- Read: `gh issue view <number> --json number,title,body,labels,comments`
- List: `gh issue list --state open --json number,title,body,labels`
- Comment: `gh issue comment <number> --body "<text>"`
- Close: `gh issue close <number> --comment "<resolution>"`

When a skill says to publish a specification, create a GitHub issue. A bare
`#123` may refer to an issue or pull request, so resolve the PR first and fall
back to the issue.

Do not create tickets in another repository. Before the first issue-creation
operation in a session, verify `nameWithOwner` is
`aaif/aaif-dallas-community`.
