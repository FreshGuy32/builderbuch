'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const webpack_bundle_analyzer_1 = require('webpack-bundle-analyzer')
const webpack_1 = require('webpack')
const path_1 = require('path')
const fork_ts_checker_webpack_plugin_1 = __importDefault(
    require('fork-ts-checker-webpack-plugin')
)
const getAdditional_1 = require('../helper/getAdditional')
const html_webpack_plugin_1 = __importDefault(require('html-webpack-plugin'))
exports.plugins = async args => {
    var _a, _b
    const additionalPlugins =
        (_a = await getAdditional_1.getAdditionalPlugins(args)) !== null &&
        _a !== void 0
            ? _a
            : []
    const environmentPlugin = new webpack_1.EnvironmentPlugin({
        mode: args.mode,
        environment: args.environment,
    })
    const forkTsCheckerPlugin = new fork_ts_checker_webpack_plugin_1.default({
        tsconfig: path_1.resolve(args.basePath, 'tsconfig.json'),
        eslint: true,
        eslintOptions: {
            configFile: path_1.resolve(args.basePath, '.eslintrc'),
        },
    })
    const additions = additionalPlugins
        .filter(plugin => plugin.type === 'addition')
        .map(({ value: plugin }) => plugin)
    const plugins = [environmentPlugin, forkTsCheckerPlugin, ...additions]
    const overrides = additionalPlugins.filter(
        plugin => plugin.type === 'override'
    )
    const htmlWebpackPlugin = overrides.find(
        plugin => plugin.name === 'HtmlWebpackPlugin'
    )
    if (args.type === 'start') {
        plugins.push(
            (_b =
                htmlWebpackPlugin === null || htmlWebpackPlugin === void 0
                    ? void 0
                    : htmlWebpackPlugin.value) !== null && _b !== void 0
                ? _b
                : new html_webpack_plugin_1.default()
        )
    }
    if (args.type === 'build' && htmlWebpackPlugin) {
        plugins.push(htmlWebpackPlugin.value)
    }
    if (args.type === 'build' && args.analyze) {
        plugins.push(
            new webpack_bundle_analyzer_1.BundleAnalyzerPlugin({
                analyzerMode: 'static',
            })
        )
    }
    return plugins
}
//# sourceMappingURL=plugins.js.map
