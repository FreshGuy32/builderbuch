import webpack from 'webpack'

type Mode = Exclude<webpack.Configuration['mode'], 'none' | undefined>
export interface ICommonArgs {
    basePath: string

    entry: string
    output: string

    plugins: string
    rules: string

    environment: 'prod' | 'stg' | 'dev'
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
