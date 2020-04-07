/// <reference types="webpack" />
/// <reference types="webpack-dev-server" />
import { PossibleArguments } from '../types';
export declare const getAdditionalPlugins: (args: PossibleArguments) => Promise<(import("../types").ExtendableAdditon<import("webpack").Plugin> | import("../types").ExtendableOverride<import("webpack").Plugin, "HtmlWebpackPlugin">)[] | undefined>;
export declare const getAdditionalRules: (args: PossibleArguments) => Promise<(import("../types").ExtendableAdditon<import("webpack").RuleSetRule> | import("../types").ExtendableOverride<import("webpack").RuleSetRule, "styles">)[] | undefined>;
