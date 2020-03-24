import { PossibleArguments } from '../types'

interface IPluginModule {
    default: (args: PossibleArguments) => void
}
export const moduleIsCorrect = (
    moduleToCheck: unknown
): moduleToCheck is IPluginModule =>
    !!(
        typeof moduleToCheck === 'object' &&
        moduleToCheck &&
        'default' in moduleToCheck &&
        typeof (moduleToCheck as { default: unknown }).default === 'function'
    )
