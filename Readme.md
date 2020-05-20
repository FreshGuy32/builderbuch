# Readme

This projects aim is to simplify usage of webpack and to abstract away the configuration.
There are two seperate scripts, `start` and `build`, that can be called.

`build` is used to create a simple build of the project. It can also be started in **watch** mode. \
`start` is used to start an instance of `webpack-dev-server`. If available it will start on port **3000**, otherwise it searches automatically for an available port. If no `webpack-html-plugin` is provided via `extension.js`, one will be injected for you with all the default options.

You can extend **builderbuch** by providing an optional `extension.js` file. This file can export `plugins` and/or `rules` functions that can provide **additons** or **overrides** to some of the internaly used rules and plugins.

`extension.ts`

```ts
import { ExtensionPlugins, ExtensionRules } from '@freshguy32/builderbuch_cli/src/extendability'

export const plugins: ExtensionPlugins = (basePath, environment, mode) => [
    // ...
]

export const rules: ExtensionRules = (basePath, environment, mode) => [
    // ...
]
```