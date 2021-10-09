// import clearConsole from 'react-dev-utils/clearConsole'
import { argv } from './helper/args'
import { onSigint } from './helper/onSigint'
import { loadExtensions } from './helper/loadExtensions'
import { resolve } from 'path'
import { createCompiler } from '@builderbuch/core/src/webpack/createCompiler'
import { validateFoundConfigs } from './helper/validateFoundConfigs'
import { checkIfConfigFilesExist } from './helper/checkIfConfigFilesExist'
import { defaultOptimization } from '@builderbuch/core/src/webpack/optimization'
import { defaultResolve } from '@builderbuch/core/src/webpack/defaultResolve'
;(async () => {
    const configFiles = validateFoundConfigs(
        await checkIfConfigFilesExist(argv.basePath)
    )

    const extension = await loadExtensions(
        resolve(argv.basePath, argv.extension)
    )
    if (
        extension?.allowedEnvironments &&
        argv.environment &&
        !extension.allowedEnvironments.includes(argv.environment)
    ) {
        throw new Error(
            `Environment '${
                argv.environment
            }' doesn't exist in allowed environments '${JSON.stringify(
                extension.allowedEnvironments
            )}'.`
        )
    }

    const fallback = () => []
    const compiler = await createCompiler({
        ...argv,
        type: 'build',
        extensionPlugins: extension?.plugins ?? fallback,
        extensionRules: extension?.rules ?? fallback,
        extensionOptimization: extension?.optimization ?? defaultOptimization,
        extensionResolve: extension?.resolve ?? defaultResolve,
        configFiles,
    })

    return new Promise(resolve => {
        if (argv.watch) {
            const watcher = compiler.watch({}, er => {
                if (er) {
                    return console.log(er)
                }
                if (process.stdout.isTTY) {
                    // clearConsole()
                }
            })

            onSigint(() => watcher.close(() => resolve(process.exit())))
        } else {
            compiler.run(() => resolve(undefined))
        }
    }).then()
})()
