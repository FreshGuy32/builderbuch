import { pathExists } from 'fs-extra'
import { resolve } from 'path'

type ConfigFileTypes = 'babel' | 'ts' | 'eslint'
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

            return [
                type,
                variants.filter(([, exists]) => exists).map(([path]) => path),
            ] as const
        })
    )

    return Object.fromEntries(ret) as Record<ConfigFileTypes, string[]>
}
