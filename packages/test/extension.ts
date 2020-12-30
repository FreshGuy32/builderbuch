import {
    ExtensionOptimization,
    ExtensionPlugins,
} from '@builderbuch/cli/src/extendability'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'

export const plugins: ExtensionPlugins = ({ basePath }) => [
    {
        mode: 'override',
        type: 'plugins',
        name: 'HtmlWebpackPlugin',
        value: new HtmlWebpackPlugin({
            title: 'Integration Test',
            template: resolve(basePath, 'template.html'),
        }),
    },
]

// export const optimization: ExtensionOptimization = () => ({})
