import WebpackDevServer from 'webpack-dev-server'
// import { choosePort } from 'react-dev-utils/WebpackDevServerUtils'
import { onSigint } from './helper/onSigint'
import { argv } from './helper/args'
import { createCompiler } from '@builderbuch/core/src/webpack/createCompiler'
import { loadExtensions } from './helper/loadExtensions'
import { resolve } from 'path'
import { checkIfConfigFilesExist } from './helper/checkIfConfigFilesExist'
import { validateFoundConfigs } from './helper/validateFoundConfigs'
import { defaultOptimization } from '@builderbuch/core/src/webpack/optimization'
import { defaultResolve } from '@builderbuch/core/src/webpack/defaultResolve'
;(async () => {
    const configFiles = validateFoundConfigs(
        await checkIfConfigFilesExist(argv.basePath)
    )

    const extension = await loadExtensions(
        resolve(argv.basePath, argv.extension)
    )

    const fallback = () => []
    const compiler = await createCompiler({
        ...argv,
        type: 'start',
        extensionPlugins: extension?.plugins ?? fallback,
        extensionRules: extension?.rules ?? fallback,
        extensionOptimization: extension?.optimization ?? defaultOptimization,
        extensionResolve: extension?.resolve ?? defaultResolve,
        configFiles,
    })
    const port = 3000 // await choosePort('', 3000)
    if (!port) {
        return console.error('No suitable network port found!')
    }

    const devServer = new WebpackDevServer(
        { port, historyApiFallback: true, open: true },
        compiler
    )
    await devServer.start()

    return new Promise(resolve => {
        onSigint(() => devServer.stopCallback(() => resolve(process.exit())))
    })
})()
