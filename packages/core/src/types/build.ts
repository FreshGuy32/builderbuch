import webpack from 'webpack'
import {
    ExtensionOptimization,
    ExtensionPlugins,
    ExtensionResolve,
    ExtensionRules,
} from './extendability'
import { ConfigFiles } from './configFiles'

export type BuildType = 'start' | 'build'

export type BuildMode = Exclude<
    webpack.Configuration['mode'],
    'none' | undefined
>

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BuildEnvironments {}
export type BuildEnvironment = keyof BuildEnvironments extends never
    ? string
    : keyof BuildEnvironments

export interface BuildParameters {
    type: BuildType
    mode: BuildMode
    environment: BuildEnvironment | undefined

    entry: string
    output: string
    outputName: string
    publicPath: string
    basePath: string

    analyze: boolean

    extensionPlugins: ExtensionPlugins
    extensionRules: ExtensionRules
    extensionOptimization: ExtensionOptimization
    extensionResolve: ExtensionResolve

    configFiles: ConfigFiles
}
