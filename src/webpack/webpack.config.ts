import { Configuration } from 'webpack'
import { rules } from './rules'
import { plugins } from './plugins'
import { resolve } from 'path'
import { WebpackConfigArgs } from '../helper/parsedArgs'

export default (args: WebpackConfigArgs & { publicPath: string }) => {
    process.env.BABEL_ENV = process.env.NODE_ENV = process.env.BROWSERSLIST_ENV =
        args.environment

    const config: Configuration = {
        devServer: {
            historyApiFallback: true,
            hot: true,
            open: true,
            port: 3000,
            publicPath: '/',
        },
        devtool: 'eval-source-map',
        entry: resolve(args.basePath, args.entry),
        output: {
            filename: '[name].[hash].js',
            path: resolve(args.basePath, args.output),
            publicPath: args.publicPath,
        },
        mode: args.mode,
        module: {
            rules: rules(args),
        },
        plugins: plugins(args),
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.css', '.pcss'],
        },
    }

    return config
}
