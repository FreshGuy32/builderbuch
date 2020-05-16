import type webpack from 'webpack'

export type Environment = 'prod' | 'stg' | 'dev'
export type Mode = Exclude<webpack.Configuration['mode'], 'none' | undefined>
