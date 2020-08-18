# `cli`

-   [`cli`](#cli)
    -   [Usage](#usage)
        -   [Simple build](#simple-build)
        -   [Simple dev server](#simple-dev-server)
    -   [Customisation via extension file](#customisation-via-extension-file)
        -   [Example extension.ts](#example-extensionts)

Simplifies usage of webpack (including dev-server), babel and fork-ts-checker-webpack-plugin by hiding away their individual basic configuration. Instead it provides some sensible defaults, while trying not to be opinionated and being easily extendible.

Exposes two basic commands, `bb-build` and `bb-start`, that take a multitude of optional parameters. For easier usage there are some assumptions made as default values, f.e. entry file is called `index` and is in the `src` folder.

Help is available via `--help` flag, this also includes all the default values that are used.

## Usage

### Simple build

```
yarn bb-build
```

### Simple dev server

```
yarn bb-start
```

## Customisation via extension file

To provide an easy way of customising some of the plugins and rules used internally or adding entirely new ones you can use the `extension.js` file. This file will be automatically imported and used when found in the `cwd`.

To customise the functionallity you can expose an plugins and rules function. These functions get the **environment**, **basePath** and **mode** passed to it in an object. For typescript users there are helper types exposed (`ExtensionPlugins` and `ExtensionRules`).

### Example extension.ts

```ts
import {
    ExtensionPlugins,
    ExtensionPluginValues,
    ExtensionRules,
} from '@builderbuch/cli/src/extendability'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import { GenerateSW } from 'workbox-webpack-plugin'

export const plugins: ExtensionPlugins = ({ environment, basePath }) => {
    const customPlugins: ExtensionPluginValues[] = [
        {
            mode: 'override',
            name: 'HtmlWebpackPlugin',
            type: 'plugins',
            value: new HtmlWebpackPlugin({
                template: resolve(__dirname, 'template.html'),
            }),
        },
    ]

    if (environment === 'production') {
        customPlugins.push({
            mode: 'addition',
            type: 'plugins',
            value: new GenerateSW({
                skipWaiting: true,
                clientsClaim: true,
            }),
        })
    }

    return customPlugins
}

export const rules: ExtensionRules = () => [
    {
        mode: 'override',
        name: 'styles',
        type: 'rules',
        value: {
            // ...
        },
    },
]
```
