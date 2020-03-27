import { PossibleArguments } from '../types'
import { moduleIsCorrect } from './moduleIsCorrect'
import { resolve } from 'path'
import { pathExists } from 'fs-extra'

export const getAdditionalPlugins = async (args: PossibleArguments) => {
    const path = resolve(args.basePath, args.plugins)
    if (!(await pathExists(path))) {
        return
    }

    const additionalPluginModule = (await import(path)) as unknown

    if (!moduleIsCorrect<'plugins'>(additionalPluginModule)) {
        return
    }

    return additionalPluginModule.default(args)
}
