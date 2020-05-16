import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { Plugin, EnvironmentPlugin } from 'webpack'
import { resolve } from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import {
    ExtensionPluginAdditon,
    ExtensionPluginOverride,
} from '../types/extendability'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { pathExists } from 'fs-extra'
import { IBuildParameters } from '../types/build'

export const plugins = async ({
    type,
    analyze,
    basePath,
    environment,
    extensionPlugins,
    mode,
}: Pick<
    IBuildParameters,
    | 'analyze'
    | 'basePath'
    | 'environment'
    | 'extensionPlugins'
    | 'mode'
    | 'type'
>) => {
    const additionalPlugins = extensionPlugins(basePath, environment, mode)

    const environmentPlugin = new EnvironmentPlugin({
        mode: mode,
        environment: environment,
    })

    const eslintConfigPath = resolve(basePath, '.eslintrc')
    const tsConfigPath = resolve(basePath, 'tsconfig.json')
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
    if (type === 'start') {
        plugins.push(
            htmlWebpackPlugin?.value ?? (new HtmlWebpackPlugin() as Plugin)
        )
    }
    if (type === 'build' && htmlWebpackPlugin) {
        plugins.push(htmlWebpackPlugin.value)
    }

    if (type === 'build' && analyze) {
        plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
            }) as Plugin
        )
    }

    return plugins
}
