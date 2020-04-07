import { WebpackStartConfigArgs } from './helper/parsedArgsStart';
import { WebpackBuildConfigArgs } from './helper/parsedArgsBuild';
import { Plugin, RuleSetRule } from 'webpack';
export declare type PossibleArguments = WebpackBuildConfigArgs | WebpackStartConfigArgs;
export declare type OverrideablePluginNames = 'HtmlWebpackPlugin';
export declare type OverrideableRuleNames = 'styles';
export declare type ExtendableAdditon<T> = {
    type: 'addition';
    value: T;
};
export declare type ExtendableOverride<T, U> = {
    type: 'override';
    name: U;
    value: T;
};
export declare type AdditionalPlugins = (args: PossibleArguments) => (ExtendableAdditon<Plugin> | ExtendableOverride<Plugin, OverrideablePluginNames>)[];
export declare type AdditionalRules = (args: PossibleArguments) => (ExtendableAdditon<RuleSetRule> | ExtendableOverride<RuleSetRule, OverrideableRuleNames>)[];
