'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const path_1 = require('path')
const getAdditional_1 = require('../helper/getAdditional')
exports.rules = async args => {
    var _a, _b
    const additionalRules =
        (_a = await getAdditional_1.getAdditionalRules(args)) !== null &&
        _a !== void 0
            ? _a
            : []
    const additions = additionalRules.filter(value => value.type === 'addition')
    const overrides = additionalRules.filter(value => value.type === 'override')
    const rules = [
        {
            test: /\.(js|ts)x?$/i,
            use: ['source-map-loader'],
            enforce: 'pre',
        },
        {
            test: /\.(js|ts)x?$/i,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    extends: path_1.resolve(args.basePath, '.babelrc'),
                    envName: args.environment,
                },
            },
        },
        ...additions.map(({ value }) => value),
    ]
    const styleRule = overrides.find(({ name }) => name === 'styles')
    rules.push(
        (_b =
            styleRule === null || styleRule === void 0
                ? void 0
                : styleRule.value) !== null && _b !== void 0
            ? _b
            : {
                  test: /\.css$/i,
                  use: ['style-loader', 'css-loader'],
              }
    )
    return rules
}
//# sourceMappingURL=rules.js.map
