import * as webpack from 'webpack'
import {
    ExtensionOptimization,
    ExtensionPlugins,
    ExtensionRules,
} from './extendability'
import { ConfigFiles } from './configFiles'

export type BuildType = 'start' | 'build'

export type BuildMode = Exclude<
    webpack.Configuration['mode'],
    'none' | undefined
>
export type BuildEnvironment = BuildMode | 'staging'

export interface BuildParameters {
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
    extensionOptimization: ExtensionOptimization

    configFiles: ConfigFiles
}
