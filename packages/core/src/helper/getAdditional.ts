import { PossibleArgs } from '../types/args'
import { moduleIsCorrect } from './moduleIsCorrect'
import { resolve } from 'path'
import { pathExists } from 'fs-extra'

export const getAdditionalPlugins = async (args: PossibleArgs) => {
    const path = resolve(args.basePath, args.plugins)
    if (!(await pathExists(path))) {
        return
    }

    const additionalPluginsModule = (await import(path)) as unknown

    if (!moduleIsCorrect<'plugins'>(additionalPluginsModule)) {
        return
    }

    return additionalPluginsModule.default(args)
}

export const getAdditionalRules = async (args: PossibleArgs) => {
    const path = resolve(args.basePath, args.rules)
    if (!(await pathExists(path))) {
        return
    }

    const additionalRulesModule = (await import(path)) as unknown

    if (!moduleIsCorrect<'rules'>(additionalRulesModule)) {
        return
    }

    return additionalRulesModule.default(args)
}
