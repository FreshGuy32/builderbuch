import webpack from 'webpack'
import { ExtensionPlugins, ExtensionRules } from './extendability'
import { ConfigFiles } from './configFiles'

export type BuildType = 'start' | 'build'

export type BuildEnvironment = 'prod' | 'stg' | 'dev'
export type BuildMode = Exclude<
    webpack.Configuration['mode'],
    'none' | undefined
>

export interface IBuildParameters {
    type: BuildType
    mode: BuildMode
    environment: BuildEnvironment

    entry: string
    output: string
    publicPath: string
    basePath: string

    analyze: boolean

    extensionPlugins: ExtensionPlugins
    extensionRules: ExtensionRules

    configFiles: ConfigFiles
}
