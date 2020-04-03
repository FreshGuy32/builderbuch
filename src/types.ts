import { WebpackStartConfigArgs } from './helper/parsedArgsStart'
import { WebpackBuildConfigArgs } from './helper/parsedArgsBuild'
import { Plugin, RuleSetRule } from 'webpack'

export type PossibleArguments = WebpackBuildConfigArgs | WebpackStartConfigArgs

type OverrideablePluginNames = 'HtmlWebpackPlugin'
export type AdditionalPlugins = (
    args: PossibleArguments
) => (Plugin | { name: OverrideablePluginNames; plugin: Plugin })[]
export type AdditionalRules = (args: PossibleArguments) => RuleSetRule[]
