import { argv } from './helper/parsedArgs'
import clearConsole from 'react-dev-utils/clearConsole'
import { createCompiler } from './helper/createCompiler'
;(async () => {
    const compiler = await createCompiler()

    await new Promise(resolve => {
        if (argv.watch) {
            const watcher = compiler.watch({}, () => clearConsole())

            process.on('SIGINT', () => {
                watcher.close(() => {
                    resolve(process.exit())
                })
            })
        } else {
            compiler.run(() => resolve())
        }
    }).then()
})()
