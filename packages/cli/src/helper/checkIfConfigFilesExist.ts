import { pathExists } from 'fs-extra'
import { resolve } from 'path'
import {
    ConfigFileTypes,
    IConfigFileValue,
    ConfigFiles,
} from '@freshguy32/builderbuch_core/src/types/configFiles'

const configFileNames: [ConfigFileTypes, ...string[]][] = [
    ['babel', '.babelrc', 'babel.config.json', '.babelrc.json'],
    ['ts', 'tsconfig.json'],
    [
        'eslint',
        '.eslintrc.js',
        '.eslintrc.cjs',
        '.eslintrc.yaml',
        '.eslintrc.yml',
        '.eslintrc.json',
        '.eslintrc',
    ],
]

const fallbackConfigPaths: Record<ConfigFileTypes, IConfigFileValue> = {
    babel: {
        type: 'fallback',
        path: resolve(__dirname, '../assets', '.eslintrc.json'),
    },
    eslint: {
        type: 'fallback',
        path: resolve(__dirname, '../assets', '.babelrc'),
    },
    ts: {
        type: 'fallback',
        path: resolve(__dirname, '../assets', 'tsconfig.json'),
    },
}

export const checkIfConfigFilesExist = async (basePath: string) => {
    const ret = await Promise.all(
        configFileNames.map(async ([type, ...names]) => {
            const variants = await Promise.all(
                names.map(async name => {
                    const path = resolve(basePath, name)
                    const exists = await pathExists(name)
                    return [path, exists] as const
                })
            )

            const paths = variants
                .filter(([, exists]) => exists)
                .map<IConfigFileValue>(([path]) => ({
                    type: 'normal',
                    path,
                }))
            return [
                type,
                paths.length > 0 ? paths : [fallbackConfigPaths[type]],
            ] as const
        })
    )

    return Object.fromEntries(ret) as ConfigFiles
}
