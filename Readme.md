# Readme

This projects aim is to simplify usage of webpack and to abstract away the configuration. There are two seperate scripts, `start` and `build`, that can be called.

By design the project doesn't include much more than `babel-loader`, `source-map-loader` and `BundleAnalyzerPlugin`. This is to be as flexible as possible, while offering ways to expand the capabilities via new rules and plugins. This is done via `plugins.js` and `rules.js` files. The types that these functions must adhere to, are called `AdditionalPlugins` and `AdditionalRules`.

`plugins.ts`

```ts
import { AdditionalPlugins } from 'web-build-scripts/dist/types'

const plugins: AdditionalPlugins = args => [
    // ...
]

export default plugins
```

`rules.ts`

```ts
import { AdditionalRules } from 'web-build-scripts/dist/types'

const rules: AdditionalRules = args => [
    // ...
]

export default rules
```

These functions get all the arguments from `yargs` passed to it and returns an array.
This array either contains `override`s or `addition`s. `override`s replace the specified **rule** or **plugin**. `addition`s are additional **rules** and **plugins** that aren't builtin and get added from the user side.