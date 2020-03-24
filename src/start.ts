import clearConsole from 'react-dev-utils/clearConsole'
import { createCompiler } from './helper/createCompiler'
import WebpackDevServer from 'webpack-dev-server'
import { choosePort } from 'react-dev-utils/WebpackDevServerUtils'
import { onSigint } from './helper/onSigint'
;(async () => {
    const compiler = await createCompiler()
    const port = await choosePort('', 3000)
    if (!port) {
        return console.error('No suitable port found!')
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
