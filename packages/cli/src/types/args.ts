import { Environment, Mode } from '@freshguy32/builderbuch_core/src/types/build'

export interface ICommonArgs {
    basePath: string

    entry: string
    output: string

    plugins: string
    rules: string

    environment: Environment
    mode: Mode
}

export interface IStartArgs extends ICommonArgs {
    type: 'start'
}
export interface IBuildArgs extends ICommonArgs {
    type: 'build'
    analyze: boolean
    watch: boolean
}

export type PossibleArgs = IStartArgs | IBuildArgs
