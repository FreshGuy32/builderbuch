import { IConfigOptions } from './types'

export const rules = ({ mode }: IConfigOptions) => [
    {
        test: /\.(js|ts)x?$/i,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                extends: '../.babelrc',
                envName: mode,
            },
        },
    },
    // {
    //     test: /\.css$/i,
    //     use: ['style-loader', 'css-loader'],
    // },
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
