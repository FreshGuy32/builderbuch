'use strict'
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod
        var result = {}
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k]
        result['default'] = mod
        return result
    }
Object.defineProperty(exports, '__esModule', { value: true })
const moduleIsCorrect_1 = require('./moduleIsCorrect')
const path_1 = require('path')
const fs_extra_1 = require('fs-extra')
exports.getAdditionalPlugins = async args => {
    const path = path_1.resolve(args.basePath, args.plugins)
    if (!(await fs_extra_1.pathExists(path))) {
        return
    }
    const additionalPluginsModule = await Promise.resolve().then(() =>
        __importStar(require(path))
    )
    if (!moduleIsCorrect_1.moduleIsCorrect(additionalPluginsModule)) {
        return
    }
    return additionalPluginsModule.default(args)
}
exports.getAdditionalRules = async args => {
    const path = path_1.resolve(args.basePath, args.rules)
    if (!(await fs_extra_1.pathExists(path))) {
        return
    }
    const additionalRulesModule = await Promise.resolve().then(() =>
        __importStar(require(path))
    )
    if (!moduleIsCorrect_1.moduleIsCorrect(additionalRulesModule)) {
        return
    }
    return additionalRulesModule.default(args)
}
//# sourceMappingURL=getAdditional.js.map
