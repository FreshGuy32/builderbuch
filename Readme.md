# Readme

This projects aim is to simplify usage of webpack and to abstract away the configuration.
There are two seperate scripts, `start` and `build`, that can be called.

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

These functions get all the arguments from `yargs` passed to it and returns an array.
This array either contains `override`s or `addition`s. `override`s replace the specified **rule** or **plugin**. `addition`s are additional **rules** and **plugins** that aren't builtin and get added from the user side.