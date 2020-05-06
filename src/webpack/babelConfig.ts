import { PossibleArguments } from '../types'
import { resolve } from 'path'

export const babelConfig = (args: PossibleArguments) => {
    return {
        extends: resolve(args.basePath, '.babelrc'),
        presets: ['@babel/preset-typescript'],
    }
}
