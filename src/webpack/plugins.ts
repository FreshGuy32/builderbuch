import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { Plugin, EnvironmentPlugin } from 'webpack'
import { resolve } from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { PossibleArguments } from '../types'
import { getAdditionalPlugins } from '../helper/getAdditionalPlugins'

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

    const plugins: Plugin[] = [
        environmentPlugin,
        forkTsCheckerPlugin,
        ...additionalPlugins,
    ]

    if (args.type === 'build' && args.analyze) {
        plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
            })
        )
    }

    return plugins
}
