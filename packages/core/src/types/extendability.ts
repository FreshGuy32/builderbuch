import { Options, Plugin, RuleSetRule } from 'webpack'
import { BuildParameters } from './build'

export type ExtensionType = 'plugins' | 'rules'

export type OverrideablePluginNames = 'HtmlWebpackPlugin'
export type OverrideableRuleNames = 'styles'
export type ExtendableAdditon<Value> = {
    mode: 'addition'
    value: Value
}
export type ExtendableOverride<Value, Name> = {
    mode: 'override'
    name: Name
    value: Value
}

export type ExtensionPluginAdditon = ExtendableAdditon<Plugin>
export type ExtensionPluginOverride = ExtendableOverride<
    Plugin,
    OverrideablePluginNames
>
export type ExtensionRuleAdditon = ExtendableAdditon<RuleSetRule>
export type ExtensionRuleOverride = ExtendableOverride<
    RuleSetRule,
    OverrideableRuleNames
>

export type ExtensionPluginValues =
    | ExtensionPluginAdditon
    | ExtensionPluginOverride
export type ExtensionRuleValues = ExtensionRuleAdditon | ExtensionRuleOverride

type ExtensionFn<T> = (
    args: Pick<BuildParameters, 'basePath' | 'environment' | 'mode'>
) => T

export type ExtensionPlugins = ExtensionFn<ExtensionPluginValues[]>
export type ExtensionRules = ExtensionFn<ExtensionRuleValues[]>
export type ExtensionOptimization = ExtensionFn<Options.Optimization>

export type ExtensionValues = ExtensionPluginValues | ExtensionRuleValues
export type ExtensionFunctions = ExtensionPlugins | ExtensionRules

export interface ExtensionModule {
    plugins?: ExtensionPlugins
    rules?: ExtensionRules
    optimization?: ExtensionOptimization
}
