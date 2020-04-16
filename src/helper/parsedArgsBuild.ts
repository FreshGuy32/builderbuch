import yargs from 'yargs'
import { argsCommon } from './argsCommon'

const { argv } = yargs.options({
    ...argsCommon,

    analyze: { type: 'boolean', default: false, alias: 'a' },

    watch: { type: 'boolean', default: false, alias: 'w' },
})
export const buildArgv = { ...argv, type: 'build' } as const

export type WebpackBuildConfigArgs = Pick<
    typeof buildArgv,
    keyof typeof argsCommon | 'analyze' | 'watch'
>
