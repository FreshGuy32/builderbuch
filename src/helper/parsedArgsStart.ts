import yargs from 'yargs'
import { argsCommon } from './argsCommon'

const { argv } = yargs.options({
    ...argsCommon,
})

export const startArgv = { ...argv, type: 'start' } as const
export type WebpackStartConfigArgs = Pick<
    typeof startArgv,
    keyof typeof argsCommon
>
