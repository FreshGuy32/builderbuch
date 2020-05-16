import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { Plugin, EnvironmentPlugin } from 'webpack'
import { resolve } from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { PossibleArgs } from '../types/args'
import {
    ExtensionPlugins,
    ExtensionPluginAdditon,
    ExtensionPluginOverride,
} from '../types/extendability'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { pathExists } from 'fs-extra'

export const plugins = async (
    extensionRules: ExtensionPlugins,
    args: PossibleArgs
) => {
    const additionalPlugins = extensionRules(args)

    const environmentPlugin = new EnvironmentPlugin({
        mode: args.mode,
        environment: args.environment,
    })

    const eslintConfigPath = resolve(args.basePath, '.eslintrc')
    const tsConfigPath = resolve(args.basePath, 'tsconfig.json')
    const forkTsCheckerPlugin = new ForkTsCheckerWebpackPlugin()
    if (await pathExists(tsConfigPath)) {
        forkTsCheckerPlugin.options.tsconfig = tsConfigPath
    }
    if (await pathExists(eslintConfigPath)) {
        forkTsCheckerPlugin.options.eslint = true
        forkTsCheckerPlugin.options.eslintOptions = {
            configFile: eslintConfigPath,
        }
    }

    const additions = additionalPlugins
        .filter(
            (plugin): plugin is ExtensionPluginAdditon =>
                plugin.mode === 'addition'
        )
        .map(({ value: plugin }) => plugin)

    const plugins: Plugin[] = [
        environmentPlugin,
        forkTsCheckerPlugin,
        ...additions,
    ]

    const overrides = additionalPlugins.filter(
        (plugin): plugin is ExtensionPluginOverride =>
            plugin.mode === 'override'
    )

    const htmlWebpackPlugin = overrides.find(
        plugin => plugin.name === 'HtmlWebpackPlugin'
    )
    if (args.type === 'start') {
        plugins.push(
            htmlWebpackPlugin?.value ?? (new HtmlWebpackPlugin() as Plugin)
        )
    }
    if (args.type === 'build' && htmlWebpackPlugin) {
        plugins.push(htmlWebpackPlugin.value)
    }

    if (args.type === 'build' && args.analyze) {
        plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
            }) as Plugin
        )
    }

    return plugins
}
