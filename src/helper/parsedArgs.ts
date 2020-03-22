import yargs from 'yargs'
import webpack from 'webpack'

type Mode = Exclude<webpack.Configuration['mode'], 'none' | undefined>

export const { argv } = yargs.options({
    entry: { type: 'string', default: 'src/index.ts', alias: 'e' },
    output: { type: 'string', default: 'dist', alias: 'o' },
    analyze: { type: 'boolean', default: false, alias: 'a' },

    environment: {
        type: 'string',
        choices: ['prod', 'stg', 'dev'] as const,
        default: 'stg',
    },
    basePath: { type: 'string', default: process.cwd() },
    mode: {
        type: 'string',
        choices: ['development', 'production'] as Mode[],
        default: 'development' as Mode,
    },

    watch: { type: 'boolean', default: false, alias: 'w' },
})
export type WebpackConfigArgs = Pick<
    typeof argv,
    'entry' | 'output' | 'analyze' | 'mode' | 'environment' | 'basePath'
>
