import yargs from 'yargs'
import { argsCommon } from './argsCommon'
import { IBuildArgs } from '@freshguy32/builderbuch_core/src/types/args'

const { argv } = yargs.options({
    ...argsCommon,

    analyze: {
        type: 'boolean',
        default: false,
        alias: 'a',
        description: 'Wether to include WebpackBundleAnalyzer plugin.',
        boolean: true,
    },

    watch: { type: 'boolean', default: false, alias: 'w' },
})
export const buildArgv: Readonly<IBuildArgs> = { ...argv, type: 'build' }
