import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { Plugin, EnvironmentPlugin } from 'webpack'
import { resolve } from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { PossibleArguments, PluginAdditon, PluginOverride } from '../types'
import { getAdditionalPlugins } from '../helper/getAdditionalPlugins'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export const plugins = async (args: PossibleArguments) => {
    const additionalPlugins = (await getAdditionalPlugins(args)) ?? []

    const environmentPlugin = new EnvironmentPlugin({
        mode: args.mode,
        environment: args.environment,
    })

    const forkTsCheckerPlugin = new ForkTsCheckerWebpackPlugin({
        tsconfig: resolve(args.basePath, 'tsconfig.json'),
        eslint: true,
        eslintOptions: {
            configFile: resolve(args.basePath, '.eslintrc'),
        },
    }) as Plugin

    const additions = additionalPlugins
        .filter((plugin): plugin is PluginAdditon => plugin.type === 'addition')
        .map(({ plugin }) => plugin)
    const plugins: Plugin[] = [
        environmentPlugin,
        forkTsCheckerPlugin,
        ...additions,
    ]

    const overrides = additionalPlugins.filter(
        (plugin): plugin is PluginOverride => plugin.type === 'override'
    )

    if (args.type === 'start') {
        const htmlWebpackPlugin = overrides.find(
            plugin => plugin.name === 'HtmlWebpackPlugin'
        )
        plugins.push(
            !htmlWebpackPlugin
                ? (new HtmlWebpackPlugin() as Plugin)
                : htmlWebpackPlugin.plugin
        )
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
