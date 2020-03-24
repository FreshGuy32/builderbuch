import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { Plugin, EnvironmentPlugin } from 'webpack'
import { WebpackBuildConfigArgs } from '../helper/parsedArgsBuild'
import { resolve } from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

export const plugins = (args: WebpackBuildConfigArgs): Plugin[] => {
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

    const plugins: Plugin[] = [environmentPlugin, forkTsCheckerPlugin]

    if (args.analyze) {
        plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
            })
        )
    }

    return plugins
}
