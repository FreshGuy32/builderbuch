export type ConfigFileTypes = 'babel' | 'ts' | 'eslint'
export interface IConfigFileValue {
    type: 'fallback' | 'normal'
    path: string
}
export type ConfigFiles = Record<ConfigFileTypes, IConfigFileValue[]>
