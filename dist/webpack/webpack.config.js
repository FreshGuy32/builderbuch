'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const rules_1 = require('./rules')
const plugins_1 = require('./plugins')
const path_1 = require('path')
exports.default = async args => {
    process.env.BABEL_ENV = process.env.NODE_ENV = process.env.BROWSERSLIST_ENV =
        args.environment
    const config = {
        devtool: 'eval-source-map',
        entry: path_1.resolve(args.basePath, args.entry),
        output: {
            filename: '[name].[hash].js',
            path: path_1.resolve(args.basePath, args.output),
            publicPath: args.publicPath,
        },
        mode: args.mode,
        module: {
            rules: await rules_1.rules(args),
        },
        plugins: await plugins_1.plugins(args),
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.css', '.pcss'],
        },
    }
    return config
}
//# sourceMappingURL=webpack.config.js.map
