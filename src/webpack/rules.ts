import { WebpackBuildConfigArgs } from '../helper/parsedArgsBuild'
import { resolve } from 'path'
import { WebpackStartConfigArgs } from '../helper/parsedArgsStart'

export const rules = (
    args: WebpackBuildConfigArgs | WebpackStartConfigArgs
) => [
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
