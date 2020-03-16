import { Configuration } from 'webpack'
// import { resolve } from 'path'

import { IConfigOptions } from './types'
import { plugins } from './plugins'
import { rules } from './rules'

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
        entry: 'D:\\Projects\\build-scripts\\test.ts',
        output: {
            filename: '[name].[hash].js',
            path: 'D:\\Projects\\build-scripts\\build', //resolve(__dirname, mode === 'production' ? 'dist2' : 'build2'),
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
