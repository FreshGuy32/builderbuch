import { PossibleArguments } from '../types';
import { RuleSetRule } from 'webpack';
export declare const rules: (args: PossibleArguments) => Promise<RuleSetRule[]>;
