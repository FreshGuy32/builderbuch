import { WebpackBuildConfigArgs } from '../helper/parsedArgsBuild'
import { resolve } from 'path'

export const rules = (args: WebpackBuildConfigArgs) => [
    {
        test: /\.(js|ts)x?$/i,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                extends: resolve(args.basePath, '.babelrc'),
                envName: args.environment,
            },
        },
    },
    {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
    },
    // {
    //     test: /\.svg$/,
    //     use: [
    //         {
    //             loader: '@svgr/webpack',
    //             options: {
    //                 svgo: true,
    //             },
    //         },
    //         'file-loader',
    //     ],
    // },
]
