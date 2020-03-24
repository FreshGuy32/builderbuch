import yargs from 'yargs'
import { argsCommon } from './argsCommon'

export const { argv: buildArgv } = yargs.options({
    ...argsCommon,

    analyze: { type: 'boolean', default: false, alias: 'a' },

    watch: { type: 'boolean', default: false, alias: 'w' },
})
export type WebpackBuildConfigArgs = Pick<
    typeof buildArgv,
    'entry' | 'output' | 'analyze' | 'mode' | 'environment' | 'basePath'
>
