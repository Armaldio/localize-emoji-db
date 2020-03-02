// https://github.com/unicode-org/cldr/tree/master/common/annotations

// @ts-ignore
import GitHub from 'github-api'

const createPR = async () => {
    const gh = new GitHub({
        token: process.env.GH_TOKEN
    })

    console.log('gh', gh)
    const repo = gh.getRepo('Armaldio', 'localize-emoji-db')
    console.log('repo', repo)
    try {
        const pr = await repo.createPullRequest({
            "title": "Updates",
            "body": "Changes ready",
            "head": "updates",
            "base": "master"
        })
        console.log('pr', pr)
    } catch (e) {
        console.error(e)
    }
}

createPR().then(() => {
    console.log('done.')
})
