import webpack from 'webpack'

type Environments = 'prod' | 'stg' | 'dev'

type Mode = Exclude<webpack.Configuration['mode'], 'none' | undefined>
export const argsCommon = {
    entry: {
        type: 'string',
        default: 'src/index' as string,
        alias: 'e',
        description: 'Entrypoint into the application for webpack.',
    },
    output: {
        type: 'string',
        default: 'dist' as string,
        alias: 'o',
        description: 'Path for the webpack outputs.',
    },

    plugins: {
        type: 'string',
        default: 'plugins.js' as string,
        description: 'Path to the plugins file that should be loaded.',
    },
    rules: {
        type: 'string',
        default: 'rules.js' as string,
        description: 'Path to the rules file that should be loaded.',
    },

    environment: {
        type: 'string',
        choices: ['prod', 'stg', 'dev'] as Environments[],
        default: 'stg' as Environments,
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
        choices: ['development', 'production'] as Mode[],
        default: 'development' as Mode,
        description:
            'Webpack mode and also gets exposed via Webpack into the build.',
    },
} as const
