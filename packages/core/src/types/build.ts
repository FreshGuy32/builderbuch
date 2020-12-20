import * as webpack from 'webpack'
import { ExtensionPlugins, ExtensionRules } from './extendability'
import { ConfigFiles } from './configFiles'

export type BuildType = 'start' | 'build'

export type BuildMode = Exclude<
    webpack.Configuration['mode'],
    'none' | undefined
>
export type BuildEnvironment = BuildMode | 'staging'

export interface IBuildParameters {
    type: BuildType
    mode: BuildMode
    environment: BuildEnvironment

    entry: string
    output: string
    outputName: string
    publicPath: string
    basePath: string

    analyze: boolean

    extensionPlugins: ExtensionPlugins
    extensionRules: ExtensionRules

    configFiles: ConfigFiles
}
