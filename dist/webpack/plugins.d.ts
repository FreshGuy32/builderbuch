import { Plugin } from 'webpack'
import { PossibleArguments } from '../types'
export declare const plugins: (args: PossibleArguments) => Promise<Plugin[]>
