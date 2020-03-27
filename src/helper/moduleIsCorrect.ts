import { PossibleArguments } from '../types'
import { Plugin } from 'webpack'

interface IPluginModule<T extends 'plugins' | 'rules'> {
    default: (args: PossibleArguments) => T extends 'plugins' ? Plugin[] : {}
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
