'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const parsedArgsBuild_1 = require('./helper/parsedArgsBuild')
const clearConsole_1 = __importDefault(require('react-dev-utils/clearConsole'))
const createCompiler_1 = require('./helper/createCompiler')
const onSigint_1 = require('./helper/onSigint')
;(async () => {
    const compiler = await createCompiler_1.createCompiler(
        parsedArgsBuild_1.buildArgv
    )
    return new Promise(resolve => {
        if (parsedArgsBuild_1.buildArgv.watch) {
            const watcher = compiler.watch({}, er => {
                if (er) {
                    return console.log(er)
                }
                if (process.stdout.isTTY) {
                    clearConsole_1.default()
                }
            })
            onSigint_1.onSigint(() =>
                watcher.close(() => resolve(process.exit()))
            )
        } else {
            compiler.run(() => resolve())
        }
    }).then()
})()
//# sourceMappingURL=build.js.map
