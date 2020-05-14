import { AdditionalPlugins, AdditionalRules } from '../types/extendability'

interface IPluginModule<T extends 'plugins' | 'rules'> {
    default: T extends 'plugins' ? AdditionalPlugins : AdditionalRules
}
export const moduleIsCorrect = <T extends 'plugins' | 'rules'>(
    moduleToCheck: unknown
): moduleToCheck is IPluginModule<T> =>
    !!(
        typeof moduleToCheck === 'object' &&
        moduleToCheck &&
        'default' in moduleToCheck &&
        typeof (moduleToCheck as { default: unknown }).default === 'function'
    )
