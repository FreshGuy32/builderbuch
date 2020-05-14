import { WebpackStartConfigArgs } from './helper/parsedArgsStart'
import { WebpackBuildConfigArgs } from './helper/parsedArgsBuild'
import { Plugin, RuleSetRule } from 'webpack'

export type PossibleArguments = WebpackBuildConfigArgs | WebpackStartConfigArgs

export type OverrideablePluginNames = 'HtmlWebpackPlugin'
export type OverrideableRuleNames = 'styles'
export type ExtendableAdditon<T> = { type: 'addition'; value: T }
export type ExtendableOverride<T, U> = {
    type: 'override'
    name: U
    value: T
}

export type AdditionalPlugins = (
    args: PossibleArguments
) => (
    | ExtendableAdditon<Plugin>
    | ExtendableOverride<Plugin, OverrideablePluginNames>
)[]

export type AdditionalRules = (
    args: PossibleArguments
) => (
    | ExtendableAdditon<RuleSetRule>
    | ExtendableOverride<RuleSetRule, OverrideableRuleNames>
)[]
