import { buildArgv } from './helper/parsedArgsBuild'
import clearConsole from 'react-dev-utils/clearConsole'
import { createCompiler } from './helper/createCompiler'
import { onSigint } from './helper/onSigint'
;(async () => {
    const compiler = await createCompiler(buildArgv)

    return new Promise(resolve => {
        if (buildArgv.watch) {
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
