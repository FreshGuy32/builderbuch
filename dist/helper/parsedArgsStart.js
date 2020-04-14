'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const yargs_1 = __importDefault(require('yargs'))
const argsCommon_1 = require('./argsCommon')
const { argv } = yargs_1.default.options({
    ...argsCommon_1.argsCommon,
})
exports.startArgv = { ...argv, type: 'start' }
//# sourceMappingURL=parsedArgsStart.js.map
