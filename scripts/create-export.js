import fs from 'fs/promises'
import path from 'path'
import { globby } from 'globby'

const globFiles = ['src/**/*.js', '!src/index.js', '!src/_internal']
const files = await globby(globFiles)

const buildRes = type =>
  files.sort().map(f => {
    const { dir, base, name } = path.parse(f)
    const src = `./${dir.replace('src/', '')}/${base}`

    return `export { default as ${name} } from '${src}'`
  }).join('\n')

// Build Exports
fs.writeFile('src/index.js', `${buildRes('standard')}\n`)
  .then(() => console.log('Finished Writing Exports... Wrapping up...'))
  .catch(console.error)
