import clearConsole from 'react-dev-utils/clearConsole'
import { argv } from './helper/args'
import { onSigint } from './helper/onSigint'
import { loadExtensions } from './helper/loadExtensions'
import { resolve } from 'path'
import { createCompiler } from '@freshguy32/builderbuch_core/src/webpack/createCompiler'
;(async () => {
    const extension = await loadExtensions(
        resolve(argv.basePath, 'extension.js')
    )

    const fallback = () => []
    const compiler = await createCompiler({
        ...argv,
        type: 'build',
        extensionPlugins: extension?.plugins ?? fallback,
        extensionRules: extension?.rules ?? fallback,
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
