import { readdir } from 'fs-extra'
import { resolve } from 'path'

export const findClosestPackageFile = async (
    path: string,
    remainingIteration = 10
): Promise<string | undefined> => {
    if (remainingIteration === 0) {
        return
    }

    const folderContent = await readdir(path)

    const packageJson = folderContent.find(name => /package\.json/i.test(name))
    if (packageJson) {
        return resolve(path, packageJson)
    }

    return findClosestPackageFile(resolve(path, '..'), remainingIteration - 1)
}
