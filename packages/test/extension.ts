import { ExtensionPlugins } from '@freshguy32/builderbuch_cli/src/extendability'

import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'

export const plugins: ExtensionPlugins = ({basePath}) => [
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
