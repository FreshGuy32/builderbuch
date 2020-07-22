import clearConsole from 'react-dev-utils/clearConsole'
import { argv } from './helper/args'
import { onSigint } from './helper/onSigint'
import { loadExtensions } from './helper/loadExtensions'
import { resolve } from 'path'
import { createCompiler } from '@builderbuch/core/src/webpack/createCompiler'
import { validateFoundConfigs } from './helper/validateFoundConfigs'
import { checkIfConfigFilesExist } from './helper/checkIfConfigFilesExist'
;(async () => {
    const configFiles = validateFoundConfigs(
        await checkIfConfigFilesExist(argv.basePath)
    )

    const extension = await loadExtensions(
        resolve(argv.basePath, argv.extension)
    )

    const fallback = () => []
    const compiler = await createCompiler({
        ...argv,
        type: 'build',
        extensionPlugins: extension?.plugins ?? fallback,
        extensionRules: extension?.rules ?? fallback,
        configFiles,
    })

    return new Promise(resolve => {
        if (argv.watch) {
            const watcher = compiler.watch({}, er => {
                if (er) {
                    return console.log(er)
                }
                if (process.stdout.isTTY) {
                    clearConsole()
                }
            })

            onSigint(() => watcher.close(() => resolve(process.exit())))
        } else {
            compiler.run(() => resolve())
        }
    }).then()
})()
