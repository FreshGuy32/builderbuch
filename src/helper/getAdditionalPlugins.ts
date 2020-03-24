import { PossibleArguments } from '../types'
import { moduleIsCorrect } from './moduleIsCorrect'

export const getAdditionalPlugins = async (args: PossibleArguments) => {
    const path = ''
    const additionalPluginModule = (await import(path)) as unknown

    if (!moduleIsCorrect<'plugins'>(additionalPluginModule)) {
        return
    }

    additionalPluginModule.default(args)
}
