import webpack from 'webpack'
import createConfig from './webpack/webpack.config'
import { argv } from './helper/parsedArgs'
import { findClosestPackageFile } from './helper/findClosestPackageFile'
import { readFile } from 'fs-extra'
import clearConsole from 'react-dev-utils/clearConsole'
;(async () => {
    let publicPath = '/'

    const closestPackageJsonPath = await findClosestPackageFile(process.cwd())
    if (closestPackageJsonPath) {
        const content = await readFile(closestPackageJsonPath)

        const stringContent = content.toString()
        const jsonContent = JSON.parse(stringContent) as { homepage?: string }
        if (jsonContent.homepage) {
            publicPath = jsonContent.homepage
        }
    }

    const compiler = webpack(createConfig({ ...argv, publicPath }))

    await new Promise(resolve => {
        if (argv.watch) {
            const watcher = compiler.watch({}, (_, stats) => {
                clearConsole()
                console.log(stats.toString({ colors: true }))
            })

            process.on('SIGINT', () => {
                watcher.close(() => {
                    watcher.close(() => {
                        resolve(process.exit())
                    })
                })
            })
        } else {
            compiler.run((_, stats) => {
                console.log(stats.toString({ colors: true }))
                resolve()
            })
        }
    }).then()
})()
