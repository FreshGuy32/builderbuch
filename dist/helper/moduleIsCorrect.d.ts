import { AdditionalPlugins, AdditionalRules } from '../types';
interface IPluginModule<T extends 'plugins' | 'rules'> {
    default: T extends 'plugins' ? AdditionalPlugins : AdditionalRules;
}
export declare const moduleIsCorrect: <T extends "plugins" | "rules">(moduleToCheck: unknown) => moduleToCheck is IPluginModule<T>;
export {};
