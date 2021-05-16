import webpack from 'webpack'
import { createConfig } from './webpack.config'
// import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages'
import { BuildParameters } from '../types/build'

export const createCompiler = async (args: BuildParameters) => {
    const compiler = webpack(await createConfig(args))
    compiler.hooks.invalid.tap('invalid', () => {
        console.log('Compiling...')
    })

    // compiler.hooks.done.tap('done', stats => {
    //     const rawMessages = stats.toJson({})
    //     const messages = formatWebpackMessages(rawMessages)
    //     if (!messages.errors.length && !messages.warnings.length) {
    //         console.log('Compiled successfully!')
    //     }
    //     if (messages.errors.length) {
    //         console.log('Failed to compile.')
    //         messages.errors.forEach(e => console.log(e))
    //         return
    //     }
    //     if (messages.warnings.length) {
    //         console.log('Compiled with warnings.')
    //         messages.warnings.forEach(w => console.log(w))
    //     }
    // })

    return compiler
}
