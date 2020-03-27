import webpack from 'webpack'
import createConfig from '../webpack/webpack.config'
import { findClosestPackageFile } from '../helper/findClosestPackageFile'
import { readFile } from 'fs-extra'
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages'
import { PossibleArguments } from '../types'

export const createCompiler = async (args: PossibleArguments) => {
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

    const compiler = webpack(await createConfig({ ...args, publicPath }))
    compiler.hooks.invalid.tap('invalid', () => {
        console.log('Compiling...')
    })

    compiler.hooks.done.tap('done', stats => {
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
