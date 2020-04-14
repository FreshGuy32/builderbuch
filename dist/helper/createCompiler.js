'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const webpack_1 = __importDefault(require('webpack'))
const webpack_config_1 = __importDefault(require('../webpack/webpack.config'))
const findClosestPackageFile_1 = require('../helper/findClosestPackageFile')
const fs_extra_1 = require('fs-extra')
const formatWebpackMessages_1 = __importDefault(
    require('react-dev-utils/formatWebpackMessages')
)
exports.createCompiler = async args => {
    let publicPath = '/'
    const closestPackageJsonPath = await findClosestPackageFile_1.findClosestPackageFile(
        process.cwd()
    )
    if (closestPackageJsonPath) {
        const content = await fs_extra_1.readFile(closestPackageJsonPath)
        const stringContent = content.toString()
        const jsonContent = JSON.parse(stringContent)
        if (jsonContent.homepage) {
            publicPath = jsonContent.homepage
        }
    }
    const compiler = webpack_1.default(
        await webpack_config_1.default({ ...args, publicPath })
    )
    compiler.hooks.invalid.tap('invalid', () => {
        console.log('Compiling...')
    })
    compiler.hooks.done.tap('done', stats => {
        const rawMessages = stats.toJson({}, true)
        const messages = formatWebpackMessages_1.default(rawMessages)
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
//# sourceMappingURL=createCompiler.js.map
