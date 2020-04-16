'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.argsCommon = {
    entry: {
        type: 'string',
        default: 'src/index',
        alias: 'e',
        description: 'Entrypoint into the application for webpack.',
    },
    output: {
        type: 'string',
        default: 'dist',
        alias: 'o',
        description: 'Path for the webpack outputs.',
    },
    plugins: {
        type: 'string',
        default: 'plugins.js',
        description: 'Path to the plugins file that should be loaded.',
    },
    rules: {
        type: 'string',
        default: 'rules.js',
        description: 'Path to the rules file that should be loaded.',
    },
    environment: {
        type: 'string',
        choices: ['prod', 'stg', 'dev'],
        default: 'stg',
        description:
            'Environment for Browserlist and also gets exposed via Webpack into the build.',
    },
    basePath: {
        type: 'string',
        default: process.cwd(),
        description:
            'Base path from where everything else starts. Is used for entry, output, plugins and rules options.',
    },
    mode: {
        type: 'string',
        choices: ['development', 'production'],
        default: 'development',
        description:
            'Webpack mode and also gets exposed via Webpack into the build.',
    },
}
//# sourceMappingURL=argsCommon.js.map
