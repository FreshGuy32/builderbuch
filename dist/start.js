'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const clearConsole_1 = __importDefault(require('react-dev-utils/clearConsole'))
const createCompiler_1 = require('./helper/createCompiler')
const webpack_dev_server_1 = __importDefault(require('webpack-dev-server'))
const WebpackDevServerUtils_1 = require('react-dev-utils/WebpackDevServerUtils')
const onSigint_1 = require('./helper/onSigint')
const parsedArgsStart_1 = require('./helper/parsedArgsStart')
;(async () => {
    const compiler = await createCompiler_1.createCompiler(
        parsedArgsStart_1.startArgv
    )
    const port = await WebpackDevServerUtils_1.choosePort('', 3000)
    if (!port) {
        return console.error('No suitable network port found!')
    }
    const devServer = new webpack_dev_server_1.default(compiler, {
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
            clearConsole_1.default()
        }
    })
    return new Promise(resolve => {
        onSigint_1.onSigint(() =>
            devServer.close(() => resolve(process.exit()))
        )
    })
})()
//# sourceMappingURL=start.js.map
