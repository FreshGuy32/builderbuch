import webpack from 'webpack'
import createConfig from '../webpack/webpack.config'
import { findClosestPackageFile } from '../helper/findClosestPackageFile'
import { readFile } from 'fs-extra'
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages'
import { argv } from './parsedArgsBuild'

export const createCompiler = async () => {
    let publicPath = '/'

    const closestPackageJsonPath = await findClosestPackageFile(process.cwd())
    if (closestPackageJsonPath) {
        const content = await readFile(closestPackageJsonPath)

        const stringContent = content.toString()
        const jsonContent = JSON.parse(stringContent) as { homepage?: string }
        if (jsonContent.homepage) {
            publicPath = jsonContent.homepage
        }
    }
    const compiler = webpack(createConfig({ ...argv, publicPath }))
    compiler.hooks.invalid.tap('invalid', function () {
        console.log('Compiling...')
    })

    compiler.hooks.done.tap('done', function (stats) {
        const rawMessages = stats.toJson({}, true)
        const messages = formatWebpackMessages(rawMessages)
        if (!messages.errors.length && !messages.warnings.length) {
            console.log('Compiled successfully!')
        }
        if (messages.errors.length) {
            console.log('Failed to compile.')
            messages.errors.forEach(e => console.log(e))
            return
        }
        if (messages.warnings.length) {
            console.log('Compiled with warnings.')
            messages.warnings.forEach(w => console.log(w))
        }
    })

    return compiler
}
