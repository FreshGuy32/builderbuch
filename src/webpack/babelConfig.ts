import { PossibleArguments } from '../types'
import { resolve } from 'path'
import { pathExists } from 'fs-extra'

export const babelConfig = async (args: PossibleArguments) => {
    const babelConfigPath = resolve(args.basePath, '.babelrc')
    return {
        extends: (await pathExists(babelConfigPath)) ? babelConfig : undefined,
        presets: ['@babel/preset-typescript'],
    }
}
