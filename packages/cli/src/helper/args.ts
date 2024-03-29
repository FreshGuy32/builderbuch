import * as yargs from 'yargs'
import { BuildEnvironment, BuildMode } from '@builderbuch/core/src/types/build'
import { Arguments } from '../types/args'

const args = yargs.options({
    entry: {
        type: 'string',
        default: 'src/index' as string,
        alias: 'e',
        description: 'Entrypoint into the application for webpack.',
    },
    output: {
        type: 'string',
        default: 'dist' as string,
        alias: 'o',
        description: 'Path for the webpack outputs.',
    },
    outputName: {
        type: 'string',
        default: '[name].[contenthash].js',
        alias: 'n',
        description:
            'Name for output that can include all the placeholders of webpack.',
    },
    publicPath: {
        type: 'string',
        default: '/' as string,
        description: 'Public path that will be used in the webpack config.',
    },

    extension: {
        type: 'string',
        default: 'extension.js' as string,
        description: 'Path to the extension file that should be loaded.',
    },

    environment: {
        type: 'string',
        default: undefined as undefined | BuildEnvironment,
        description:
            'Environment for Browserlist and also gets exposed via Webpack into the build.',
    },
    basePath: {
        type: 'string',
        default: process.cwd(),
        description:
            'Base path from where everything else starts. Is used for entry, output, plugins and rules options.',
    },
    mode: {
        type: 'string',
        choices: ['development', 'production'] as BuildMode[],
        default: 'development' as BuildMode,
        description:
            'Webpack mode and also gets exposed via Webpack into the build.',
    },

    analyze: {
        type: 'boolean',
        default: false,
        alias: 'a',
        description: 'Wether to include WebpackBundleAnalyzer plugin.',
        boolean: true,
    },

    watch: { type: 'boolean', default: false, alias: 'w' },
})
export const argv: Readonly<Arguments> | Promise<Readonly<Arguments>> =
    args.argv
