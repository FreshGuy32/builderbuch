import type { Configuration, RuleSetRule, ResolveOptions } from 'webpack'
import { BuildEnvironment, BuildParameters } from './build'
import { Plugin } from './plugin'

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
export type ExtensionOptimization = ExtensionFn<
    NonNullable<Configuration['optimization']>
>

export type ExtensionValues = ExtensionPluginValues | ExtensionRuleValues
export type ExtensionFunctions = ExtensionPlugins | ExtensionRules

export type ExtensionResolve = ExtensionFn<ResolveOptions>

export interface ExtensionModule {
    plugins?: ExtensionPlugins
    rules?: ExtensionRules
    optimization?: ExtensionOptimization
    resolve?: ExtensionResolve
    allowedEnvironments?: BuildEnvironment[]
}
