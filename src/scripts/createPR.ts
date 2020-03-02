// https://github.com/unicode-org/cldr/tree/master/common/annotations

const GitHub = require('github-api')

const createPR = async () => {
    const gh = new GitHub({
        token: process.env.GH_TOKEN
    })
    const pr = await gh.createPullRequest({
        "title": "Updates",
        "body": "I have some changes for you",
        "head": "updates",
        "base": "master"
    })
    console.log('pr', pr)
}

createPR().then(() => {
    console.log('done.')
})
