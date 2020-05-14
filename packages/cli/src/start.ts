import clearConsole from 'react-dev-utils/clearConsole'
import { createCompiler } from '@builderbuch/core/src/helper/createCompiler'
import WebpackDevServer from 'webpack-dev-server'
import { choosePort } from 'react-dev-utils/WebpackDevServerUtils'
import { onSigint } from '@builderbuch/core/src/helper/onSigint'
import { startArgv } from '@builderbuch/core/src/helper/parsedArgsStart'
;(async () => {
    const compiler = await createCompiler(startArgv)
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
