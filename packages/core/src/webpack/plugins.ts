import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { EnvironmentPlugin } from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import {
    ExtensionPluginAdditon,
    ExtensionPluginOverride,
} from '../types/extendability'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { BuildParameters } from '../types/build'
import { Plugin } from '../types/plugin'

export const plugins = ({
    type,
    analyze,
    basePath,
    environment,
    extensionPlugins,
    mode,
    configFiles,
}: Pick<
    BuildParameters,
    | 'analyze'
    | 'basePath'
    | 'environment'
    | 'extensionPlugins'
    | 'mode'
    | 'type'
    | 'configFiles'
>) => {
    const additionalPlugins = extensionPlugins({ basePath, environment, mode })

    const environmentPlugin = new EnvironmentPlugin({
        mode: mode,
        environment: environment,
    })

    const forkTsCheckerPlugin = new ForkTsCheckerWebpackPlugin({
        typescript: {
            configFile: configFiles.ts[0].path,
        },
        eslint: {
            enabled: true,
            files: 'src/**/*',
            options: {
                configFile: configFiles.eslint[0].path,
            },
        },
    }) as Plugin

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
            }) //as Plugin
        )
    }

    return plugins
}
