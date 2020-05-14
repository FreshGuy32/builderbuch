import yargs from 'yargs'
import { argsCommon } from './argsCommon'
import { IStartArgs } from '@builderbuch/core/src/types/args'

const { argv } = yargs.options({
    ...argsCommon,
})

export const startArgv: Readonly<IStartArgs> = { ...argv, type: 'start' }
