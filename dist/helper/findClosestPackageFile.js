'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const fs_extra_1 = require('fs-extra')
const path_1 = require('path')
exports.findClosestPackageFile = async (path, remainingIteration = 10) => {
    if (remainingIteration === 0) {
        return
    }
    const folderContent = await fs_extra_1.readdir(path)
    const packageJson = folderContent.find(name => /package\.json/i.test(name))
    if (packageJson) {
        return path_1.resolve(path, packageJson)
    }
    return exports.findClosestPackageFile(
        path_1.resolve(__dirname, '..'),
        remainingIteration - 1
    )
}
//# sourceMappingURL=findClosestPackageFile.js.map
