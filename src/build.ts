import webpack from 'webpack'
import createConfig from './webpack/webpack.config'
import { argv } from './helper/parsedArgs'

const compiler = webpack(createConfig(argv))

new Promise(resolve => {
    if (argv.watch) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const watcher = compiler.watch({ aggregateTimeout: 300 }, (_, stats) =>
            console.log(stats.toString({ colors: true }))
        )

        process.on('SIGINT', function() {
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
