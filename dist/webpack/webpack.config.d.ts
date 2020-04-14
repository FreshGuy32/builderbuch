/// <reference types="webpack-dev-server" />
import { Configuration } from 'webpack'
declare const _default: (
    args:
        | (Pick<
              {
                  readonly type: 'build'
                  readonly analyze: boolean
                  readonly watch: boolean
                  readonly entry: string
                  readonly output: string
                  readonly plugins: string
                  readonly rules: string
                  readonly environment: 'prod' | 'stg' | 'dev'
                  readonly basePath: string
                  readonly mode: 'development' | 'production'
                  readonly _: string[]
                  readonly $0: string
              },
              | 'mode'
              | 'analyze'
              | 'watch'
              | 'entry'
              | 'output'
              | 'plugins'
              | 'rules'
              | 'environment'
              | 'basePath'
              | 'type'
          > & {
              publicPath: string
          })
        | (Pick<
              {
                  readonly type: 'start'
                  readonly entry: string
                  readonly output: string
                  readonly plugins: string
                  readonly rules: string
                  readonly environment: 'prod' | 'stg' | 'dev'
                  readonly basePath: string
                  readonly mode: 'development' | 'production'
                  readonly _: string[]
                  readonly $0: string
              },
              | 'mode'
              | 'entry'
              | 'output'
              | 'plugins'
              | 'rules'
              | 'environment'
              | 'basePath'
              | 'type'
          > & {
              publicPath: string
          })
) => Promise<Configuration>
export default _default
