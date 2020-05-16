import { PossibleArgs } from '../types/args'
import { resolve } from 'path'
import { pathExists } from 'fs-extra'
import { ExtensionPlugins, ExtensionRules } from '../types/extendability'

interface IExtensionModule {
    plugins: ExtensionPlugins
    rules: ExtensionRules
}
export const loadExtensions = async (
    args: PossibleArgs
): Promise<IExtensionModule | undefined> => {
    const path = resolve(args.basePath, args.plugins)
    if (!(await pathExists(path))) {
        return
    }

    return import(path)
}
