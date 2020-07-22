import clearConsole from 'react-dev-utils/clearConsole'
import WebpackDevServer from 'webpack-dev-server'
import { choosePort } from 'react-dev-utils/WebpackDevServerUtils'
import { onSigint } from './helper/onSigint'
import { argv } from './helper/args'
import { createCompiler } from '@builderbuch/core/src/webpack/createCompiler'
import { loadExtensions } from './helper/loadExtensions'
import { resolve } from 'path'
import { checkIfConfigFilesExist } from './helper/checkIfConfigFilesExist'
import { validateFoundConfigs } from './helper/validateFoundConfigs'
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
        configFiles,
    })
    const port = await choosePort('', 3000)
    if (!port) {
        return console.error('No suitable network port found!')
    }

    const devServer = new WebpackDevServer(compiler, {
        historyApiFallback: true,
        hot: true,
        open: true,
        publicPath: '/',
    })
    devServer.listen(port, er => {
        if (er) {
            return console.log(er)
        }

        if (process.stdout.isTTY) {
            clearConsole()
        }
    })

    return new Promise(resolve => {
        onSigint(() => devServer.close(() => resolve(process.exit())))
    })
})()
