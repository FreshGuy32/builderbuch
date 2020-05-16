import { pathExists } from 'fs-extra'
import {
    ExtensionPlugins,
    ExtensionRules,
} from '@freshguy32/builderbuch_core/src/types/extendability'

interface IExtensionModule {
    plugins: ExtensionPlugins
    rules: ExtensionRules
}
export const loadExtensions = async (
    path: string
): Promise<IExtensionModule | undefined> => {
    if (!(await pathExists(path))) {
        return
    }

    return import(path)
}
