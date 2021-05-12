import {
    ExtensionPlugins,
    ExtensionResolve,
} from '@builderbuch/cli/src/extendability'
import { BuildEnvironment } from '@builderbuch/core/src/types/build'

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
        }) as any,
    },
]

export const resolve: ExtensionResolve = () => ({
    extensions: ['.tsx', '.ts', '.js', '.css', '.pcss'],
})

// export const optimization: ExtensionOptimization = () => ({})

export const allowedEnvironments: BuildEnvironment[] = [
    'production',
    'staging',
    'development',
]
