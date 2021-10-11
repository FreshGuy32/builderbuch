import { Compiler, WebpackPluginInstance } from 'webpack'

export type Plugin =
    | ((this: Compiler, compiler: Compiler) => void)
    | WebpackPluginInstance
