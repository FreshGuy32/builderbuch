/* eslint-disable @typescript-eslint/camelcase */
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { IConfigOptions } from './types'
import { Plugin } from 'webpack'
import { resolve } from 'path'
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { EnvironmentPlugin } from 'webpack'
import * as WorkboxPlugin from 'workbox-webpack-plugin'
import * as WebpackPwaManifest from 'webpack-pwa-manifest'

export const plugins = (
    baseDir: string,
    { a, mode, environment }: IConfigOptions
): Plugin[] => {
    const environmentPlugin = new EnvironmentPlugin({ mode, environment })

    const forkTsCheckerPlugin = new ForkTsCheckerWebpackPlugin({
        tsconfig: resolve(
            baseDir,
            '.',
            mode === 'production' ? 'tsconfig.prod.json' : 'tsconfig.json'
        ),
        eslint: true,
        eslintOptions: {
            configFile: resolve(
                baseDir,
                '.',
                mode === 'production' ? '.eslintrc.prod.json' : '.eslintrc'
            ),
        },
    }) as Plugin
    const htmlPlugin = new HtmlWebpackPlugin({
        minify: {
            collapseWhitespace: true,
            keepClosingSlash: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
        },
        template: resolve(baseDir, 'template.html'),
        title: 'HENRI.FM',
    }) as Plugin
    const analyzerPlugin = new BundleAnalyzerPlugin({
        analyzerMode: 'static',
    }) as Plugin

    const plugins: Plugin[] = [
        environmentPlugin,
        htmlPlugin,
        forkTsCheckerPlugin,
    ]
    if (a) {
        plugins.push(analyzerPlugin)
    }
    if (mode === 'production') {
        plugins.push(
            new WorkboxPlugin.GenerateSW({}),
            new WebpackPwaManifest({
                background_color: '#fafafa',
                display: 'standalone',
                icons: {
                    ios: true,
                    sizes: [128, 512, 1024], // multiple sizes
                    src: resolve(baseDir, '../assets/src/LogoWithSafezone.svg'),
                    purpose: 'maskable',
                } as any,
                ios: true,
                lang: 'de',
                name: 'HENRI.FM',
                description: 'HENRI.FM - Your Social Radio',
                short_name: 'HENRI.FM',
                start_url: '/',
                theme_color: '#b4000b',
            })
        )
    }
    return plugins
}
