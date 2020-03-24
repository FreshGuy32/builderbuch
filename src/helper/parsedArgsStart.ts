import yargs from 'yargs'
import { argsCommon } from './argsCommon'

export const { argv: startArgv } = yargs.options({
    ...argsCommon,
})
export type WebpackStartConfigArgs = Pick<
    typeof startArgv,
    'entry' | 'output' | 'analyze' | 'mode' | 'environment' | 'basePath'
>
