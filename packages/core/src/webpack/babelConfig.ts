import { PossibleArgs } from '../types/args'
import { resolve } from 'path'
import { pathExists } from 'fs-extra'

export const babelConfig = async (args: PossibleArgs) => {
    const babelConfigPath = resolve(args.basePath, '.babelrc')
    return {
        extends: (await pathExists(babelConfigPath))
            ? babelConfigPath
            : undefined,
        presets: ['@babel/preset-typescript'],
    }
}
