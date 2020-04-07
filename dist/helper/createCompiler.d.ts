import webpack from 'webpack';
import { PossibleArguments } from '../types';
export declare const createCompiler: (args: PossibleArguments) => Promise<webpack.Compiler>;
