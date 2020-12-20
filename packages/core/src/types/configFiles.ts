export type ConfigFileTypes = 'babel' | 'ts' | 'eslint'
export interface ConfigFileValue {
    type: 'fallback' | 'normal'
    path: string
}
export type ConfigFiles = Record<ConfigFileTypes, ConfigFileValue[]>
