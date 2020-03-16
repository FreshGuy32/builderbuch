import { Configuration } from 'webpack'
import { resolve } from 'path'

import { IConfigOptions } from './webpack/types'
import { plugins } from './webpack/plugins'
import { rules } from './webpack/rules'

export default (
    _: unknown,
    {
        a = false,
        environment = 'local',
        mode = 'development',
    }: Partial<IConfigOptions>
) => {
    process.env.BABEL_ENV = process.env.NODE_ENV = process.env.BROWSERSLIST_ENV = mode

    const config: Configuration = {
        devServer: {
            historyApiFallback: true,
            hot: true,
            open: true,
            port: 3000,
            publicPath: '/',
        },
        devtool: 'eval-source-map',
        entry: './src/index.tsx',
        output: {
            filename: '[name].[hash].js',
            path: resolve(__dirname, mode === 'production' ? 'dist' : 'build'),
            publicPath: '/',
        },
        mode,
        module: {
            rules: rules({ a, environment, mode }),
        },
        plugins: plugins(__dirname, { a, environment, mode }),
        resolve: {
            alias: {
                snapsvg: 'snapsvg/dist/snap.svg.js',
            },
            extensions: ['.tsx', '.ts', '.js', '.css', '.pcss'],
        },
    }

    return config
}
