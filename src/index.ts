import webpack from 'webpack'
import createConfig from './webpack/webpack.config'

import yargs from 'yargs'

const { argv } = yargs.options({
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
})

export type WebpackConfigArgs = Pick<
    typeof argv,
    'entry' | 'output' | 'analyze' | 'mode' | 'environment' | 'basePath'
>

const compiler = webpack(createConfig(argv))

// eslint-disable-next-line @typescript-eslint/no-empty-function
compiler.run(() => {})
