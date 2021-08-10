const core = require('@actions/core');
const github = require('@actions/github');

(async function main() {
    try {
        core.info('Building environment')
        const action = core.getInput('ACTION', {required: true, trimWhitespace: true})
        const issueNumber = core.getInput('NUMBER', {required: true, trimWhitespace: true})
        const message = core.getInput('MESSAGE', {required: false})
        const repository = core.getInput('REPO', {required: true, trimWhitespace: true})
        const token = core.getInput('TOKEN', {required: true, trimWhitespace: true})

        const owner = repository.split('/')[0]
        const repo = repository.split('/')[1]
        const client = github.getOctokit(token)

        switch (action) {
            case 'close':
                try {
                    core.info(`Closing issue: ${repository}#${issueNumber}`)
                    await close(client, owner, repo, issueNumber)
                } catch (e) {
                    core.setFailed(`Unable to close issue: ${e.message}`)
                }
                break
            case 'comment':
                try {
                    core.info(`Commenting on issue: ${repository}#${issueNumber}`)
                    await comment(client, owner, repo, message, issueNumber)
                } catch (e) {
                    core.setFailed(`Unable to comment on issue: ${e.message}`)
                }
                break
            default:
                core.setFailed(`Unknown action specified: ${action}`)
        }
    } catch (e) {
        core.setFailed(e.message)
    }
})();

async function close(client, owner, repo, issueNumber) {
    await client.rest.issues.update({
        owner: owner,
        repo: repo,
        issue_number: issueNumber,
        state: 'closed'
    })
}

async function comment(client, owner, repo, message, issueNumber) {
    await client.rest.issues.createComment({
        owner: owner,
        repo: repo,
        issue_number: issueNumber,
        body: message,
    });
}
