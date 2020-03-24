import webpack from 'webpack'

type Environments = 'prod' | 'stg' | 'dev'

type Mode = Exclude<webpack.Configuration['mode'], 'none' | undefined>
export const argsCommon = {
    entry: {
        type: 'string',
        default: 'src/index.ts' as string,
        alias: 'e',
    },
    output: { type: 'string', default: 'dist' as string, alias: 'o' },

    environment: {
        type: 'string',
        choices: ['prod', 'stg', 'dev'] as Environments[],
        default: 'stg' as Environments,
    },
    basePath: { type: 'string', default: process.cwd() },
    mode: {
        type: 'string',
        choices: ['development', 'production'] as Mode[],
        default: 'development' as Mode,
    },
} as const
