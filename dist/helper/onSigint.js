'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const sigs = ['SIGINT', 'SIGTERM']
exports.onSigint = cb => sigs.forEach(sig => process.on(sig, cb))
//# sourceMappingURL=onSigint.js.map
