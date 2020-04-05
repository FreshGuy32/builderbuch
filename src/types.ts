import { WebpackStartConfigArgs } from './helper/parsedArgsStart'
import { WebpackBuildConfigArgs } from './helper/parsedArgsBuild'
import { Plugin, RuleSetRule } from 'webpack'

export type PossibleArguments = WebpackBuildConfigArgs | WebpackStartConfigArgs

type OverrideablePluginNames = 'HtmlWebpackPlugin'
export type PluginAdditon = { type: 'addition'; plugin: Plugin }
export type PluginOverride = {
    type: 'override'
    name: OverrideablePluginNames
    plugin: Plugin
}
export type AdditionalPlugins = (
    args: PossibleArguments
) => (PluginAdditon | PluginOverride)[]

export type AdditionalRules = (args: PossibleArguments) => RuleSetRule[]
