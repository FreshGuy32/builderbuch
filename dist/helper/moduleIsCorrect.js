'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.moduleIsCorrect = moduleToCheck =>
    !!(
        typeof moduleToCheck === 'object' &&
        moduleToCheck &&
        'default' in moduleToCheck &&
        typeof moduleToCheck.default === 'function'
    )
//# sourceMappingURL=moduleIsCorrect.js.map
