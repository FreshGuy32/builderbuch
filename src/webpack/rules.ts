import { IConfigOptions } from './types'

export const rules = ({ mode }: IConfigOptions) => [
    {
        test: /\.tsx?$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                extends: './.babelrc',
                envName: mode,
            },
        },
    },
    {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
    },
    {
        test: /\.svg$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    svgo: true,
                },
            },
            'file-loader',
        ],
    },
]
