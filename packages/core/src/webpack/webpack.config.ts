import { Configuration } from 'webpack'
import { rules } from './rules'
import { plugins } from './plugins'
import { resolve } from 'path'
import { BuildParameters } from '../types/build'

export const createConfig = async ({
    entry,
    output,
    outputName,
    extensionOptimization,
    extensionResolve,
    ...args
}: BuildParameters) => {
    process.env.BABEL_ENV = process.env.NODE_ENV = process.env.BROWSERSLIST_ENV =
        args.environment

    const config: Configuration = {
        devtool:
            args.mode === 'production'
                ? 'hidden-source-map'
                : 'eval-source-map',
        entry: resolve(args.basePath, entry),
        output: {
            filename: outputName,
            path: resolve(args.basePath, output),
            publicPath: args.publicPath,
        },
        mode: args.mode,
        module: {
            rules: rules(args),
        },
        plugins: plugins(args),
        resolve: extensionResolve(args),
        optimization: extensionOptimization(args),
    }

    return config
}
