import { PossibleArguments } from '../types'

interface IPluginModule {
    default: (args: PossibleArguments) => void
}

const moduleIsCorrect = (
    moduleToCheck: unknown
): moduleToCheck is IPluginModule =>
    !!(
        typeof moduleToCheck === 'object' &&
        moduleToCheck &&
        'default' in moduleToCheck &&
        typeof (moduleToCheck as { default: unknown }).default === 'function'
    )

export const getAdditionalPlugins = async (args: PossibleArguments) => {
    const path = ''
    const additionalPluginModule = (await import(path)) as unknown

    if (!moduleIsCorrect(additionalPluginModule)) {
        return
    }

    additionalPluginModule.default(args)
}
