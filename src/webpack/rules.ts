import { resolve } from 'path'
import { PossibleArguments } from '../types'

export const rules = (args: PossibleArguments) => [
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
]
