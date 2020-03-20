import yargs from 'yargs'
import webpack from 'webpack'

export const { argv } = yargs.options({
    entry: { type: 'string', default: 'src/index.ts', alias: 'e' },
    output: { type: 'string', default: 'dist', alias: 'o' },
    analyze: { type: 'boolean', default: false, alias: 'a' },

    environment: { choices: ['prod', 'stg', 'dev'] as const, default: 'stg' },
    basePath: { type: 'string', default: process.cwd() },
    mode: {
        choices: ['development', 'production'] as Exclude<
            webpack.Configuration['mode'],
            'none'
        >[],
    },

    watch: { type: 'boolean', default: false, alias: 'w' },
})
export type WebpackConfigArgs = Pick<
    typeof argv,
    'entry' | 'output' | 'analyze' | 'mode' | 'environment' | 'basePath'
>
