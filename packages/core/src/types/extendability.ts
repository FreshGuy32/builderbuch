import { Plugin, RuleSetRule } from 'webpack'
import { PossibleArgs } from './args'

export type OverrideablePluginNames = 'HtmlWebpackPlugin'
export type OverrideableRuleNames = 'styles'
export type ExtendableAdditon<T> = { type: 'addition'; value: T }
export type ExtendableOverride<T, U> = {
    type: 'override'
    name: U
    value: T
}

export type AdditionalPlugins = (
    args: PossibleArgs
) => (
    | ExtendableAdditon<Plugin>
    | ExtendableOverride<Plugin, OverrideablePluginNames>
)[]

export type AdditionalRules = (
    args: PossibleArgs
) => (
    | ExtendableAdditon<RuleSetRule>
    | ExtendableOverride<RuleSetRule, OverrideableRuleNames>
)[]
