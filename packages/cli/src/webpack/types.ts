import { Configuration } from 'webpack'

export interface IConfigOptions {
    a: boolean
    environment: 'server' | 'local'
    mode: Configuration['mode']
}
