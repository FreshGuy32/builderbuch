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
    const args = await argv
    const configFiles = validateFoundConfigs(
        await checkIfConfigFilesExist(args.basePath)
    )

    const extension = await loadExtensions(
        resolve(args.basePath, args.extension)
    )
    if (
        extension?.allowedEnvironments &&
        args.environment &&
        !extension.allowedEnvironments.includes(args.environment)
    ) {
        throw new Error(
            `Environment '${
                args.environment
            }' doesn't exist in allowed environments '${JSON.stringify(
                extension.allowedEnvironments
            )}'.`
        )
    }

    const fallback = () => []
    const compiler = await createCompiler({
        ...args,
        type: 'build',
        extensionPlugins: extension?.plugins ?? fallback,
        extensionRules: extension?.rules ?? fallback,
        extensionOptimization: extension?.optimization ?? defaultOptimization,
        extensionResolve: extension?.resolve ?? defaultResolve,
        configFiles,
    })

    return new Promise(resolve => {
        if (args.watch) {
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
