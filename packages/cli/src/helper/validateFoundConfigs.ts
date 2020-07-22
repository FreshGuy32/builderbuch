import chalk from 'chalk'
import { ConfigFiles } from '@builderbuch/core/src/types/configFiles'

export const validateFoundConfigs = (configFiles: ConfigFiles) => {
    const copy = { ...configFiles }
    if (configFiles.babel.length > 1) {
        chalk.yellow`Multiple babel config files found, using ${configFiles.babel[0]}`
        copy.babel = [configFiles.babel[0]]
    }
    if (configFiles.eslint.length > 1) {
        chalk.yellow`Multiple eslint config files found, using ${configFiles.eslint[0]}`
        copy.eslint = [configFiles.eslint[0]]
    }
    if (
        configFiles.babel.length === 1 &&
        configFiles.babel[0].type === 'fallback'
    ) {
        chalk.yellow`No babel config file found, using empty config file as a fallback.`
    }
    if (
        configFiles.eslint.length === 1 &&
        configFiles.eslint[0].type === 'fallback'
    ) {
        chalk.yellow`No eslint config file found, using empty config file as a fallback.`
    }
    if (configFiles.ts.length === 1 && configFiles.ts[0].type === 'fallback') {
        chalk.yellow`No ts config file found, using empty config file as a fallback.`
    }

    return copy
}
