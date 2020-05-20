import { pathExists } from 'fs-extra'
import { IExtensionModule } from '@freshguy32/builderbuch_core/src/types/extendability'

export const loadExtensions = async (
    path: string
): Promise<IExtensionModule | undefined> => {
    if (!(await pathExists(path))) {
        return
    }

    return import(path)
}
