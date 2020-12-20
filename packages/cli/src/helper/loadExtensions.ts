import { pathExists } from 'fs-extra'
import { ExtensionModule } from '@builderbuch/core/src/types/extendability'

export const loadExtensions = async (
    path: string
): Promise<ExtensionModule | undefined> => {
    if (!(await pathExists(path))) {
        return
    }

    return import(path)
}
