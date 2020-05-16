import { Configuration } from 'webpack'
import { rules } from './rules'
import { plugins } from './plugins'
import { resolve } from 'path'
import { PossibleArgs } from '../types/args'
import { ExtensionPlugins, ExtensionRules } from '../types/extendability'

export default async (
    publicPath: string,
    extensionPlugins: ExtensionPlugins,
    extensionRules: ExtensionRules,
    args: PossibleArgs
) => {
    process.env.BABEL_ENV = process.env.NODE_ENV = process.env.BROWSERSLIST_ENV =
        args.environment

    const config: Configuration = {
        devtool: 'eval-source-map',
        entry: resolve(args.basePath, args.entry),
        output: {
            filename: '[name].[hash].js',
            path: resolve(args.basePath, args.output),
            publicPath: publicPath,
        },
        mode: args.mode,
        module: {
            rules: await rules(extensionRules, args),
        },
        plugins: await plugins(extensionPlugins, args),
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.css', '.pcss'],
        },
    }

    return config
}
