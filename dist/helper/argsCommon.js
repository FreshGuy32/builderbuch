'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.argsCommon = {
    entry: {
        type: 'string',
        default: 'src/index',
        alias: 'e',
    },
    output: { type: 'string', default: 'dist', alias: 'o' },
    plugins: { type: 'string', default: 'plugins.js' },
    rules: { type: 'string', default: 'rules.js' },
    environment: {
        type: 'string',
        choices: ['prod', 'stg', 'dev'],
        default: 'stg',
    },
    basePath: { type: 'string', default: process.cwd() },
    mode: {
        type: 'string',
        choices: ['development', 'production'],
        default: 'development',
    },
}
//# sourceMappingURL=argsCommon.js.map
