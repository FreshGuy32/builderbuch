import { Plugin, RuleSetRule } from 'webpack'
import { PossibleArgs } from './args'

export type ExtensionType = 'plugins' | 'rules'

export type OverrideablePluginNames = 'HtmlWebpackPlugin'
export type OverrideableRuleNames = 'styles'
export type ExtendableAdditon<Type extends ExtensionType, Value> = {
    type: Type
    mode: 'addition'
    value: Value
}
export type ExtendableOverride<Type extends ExtensionType, Value, Name> = {
    type: Type
    mode: 'override'
    name: Name
    value: Value
}

export type ExtensionPluginAdditon = ExtendableAdditon<'plugins', Plugin>
export type ExtensionPluginOverride = ExtendableOverride<
    'plugins',
    Plugin,
    OverrideablePluginNames
>
export type ExtensionRuleAdditon = ExtendableAdditon<'rules', RuleSetRule>
export type ExtensionRuleOverride = ExtendableOverride<
    'rules',
    RuleSetRule,
    OverrideableRuleNames
>

export type ExtensionPluginValues =
    | ExtensionPluginAdditon
    | ExtensionPluginOverride
export type ExtensionRuleValues = ExtensionRuleAdditon | ExtensionRuleOverride

export type ExtensionPlugins = (args: PossibleArgs) => ExtensionPluginValues[]
export type ExtensionRules = (args: PossibleArgs) => ExtensionRuleValues[]

export type ExtensionValues = ExtensionPluginValues | ExtensionRuleValues
export type ExtensionFunctions = ExtensionPlugins | ExtensionRules
