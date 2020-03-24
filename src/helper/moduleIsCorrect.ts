import { PossibleArguments } from '../types'

interface IPluginModule<T extends 'plugins' | 'rules'> {
    default: (args: PossibleArguments) => T extends 'plugins' ? [] : {}
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
