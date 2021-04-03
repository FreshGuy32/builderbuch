import {
    ExtensionOptimization,
    ExtensionPlugins,
    ExtensionResolve,
} from '@builderbuch/cli/src/extendability'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'

export const plugins: ExtensionPlugins = ({ basePath }) => [
    {
        mode: 'override',
        type: 'plugins',
        name: 'HtmlWebpackPlugin',
        value: new HtmlWebpackPlugin({
            title: 'Integration Test',
            template: path.resolve(basePath, 'template.html'),
        }),
    },
]

export const resolve: ExtensionResolve = () => ({
    extensions: ['.tsx', '.ts', '.js', '.css', '.pcss'],
})

// export const optimization: ExtensionOptimization = () => ({})
