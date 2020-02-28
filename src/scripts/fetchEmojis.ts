// https://github.com/unicode-org/cldr/tree/master/common/annotations

import fs from 'fs-extra'
import path from 'path'
import {parseStringPromise} from 'xml2js'
import rootDirectoryObj from 'app-root-path'

const rootDirectory = rootDirectoryObj.path

interface emoji {
    _: string,
    '$': {
        cp: string,
        type?: 'tts'
    }
}

const fetchEmojis = async () => {

    const cldrDirectory = path.resolve(path.join(rootDirectory, 'cldr'))
    const cldrEmojisDirectory = path.resolve(path.join(cldrDirectory, 'common', 'annotations'))
    const distEmojisDirectory = path.resolve(path.join(rootDirectory, 'dist', 'emojis'))

    await fs.ensureDir(distEmojisDirectory)

    const files = await fs.readdir(cldrEmojisDirectory)

    // for each file
    for (let i = 0; i < files.length; i++) {
        const file = files[i]

        const fileExtension = path.extname(file)
        const fileName = path.basename(file, fileExtension)

        console.log('file', file)

        const fullFilePath = path.resolve(path.join(cldrEmojisDirectory, file))

        const xml = await fs.readFile(fullFilePath, 'utf8')

        const result = await parseStringPromise(xml)
        if (result.ldml && result.ldml.annotations) {
            const emojis = result.ldml.annotations[0].annotation

            const data: any = {emojis: []}

            for (let i = 0; i < emojis.length; i++) {
                const emoji: emoji = emojis[i]

                const keywords = emoji._.split('|').map(e => e.trim())
                const symbol = emoji.$.cp
                const type = emoji.$.type

                if (type !== 'tts') {
                    // console.log(keywords, symbol)
                    data.emojis.push({
                        symbol,
                        keywords
                    })
                }
            }

            await fs.writeFileSync(path.join(distEmojisDirectory, `${fileName}.json`), JSON.stringify(data), 'utf8')
        }
    }
}

fetchEmojis().then(() => {
    console.log('done.')
})
