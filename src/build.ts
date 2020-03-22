import webpack from 'webpack'
import createConfig from './webpack/webpack.config'
import { argv } from './helper/parsedArgs'

const compiler = webpack(createConfig(argv))

const promise = argv.watch
    ? new Promise(resolve => {
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          const watcher = compiler.watch(
              { aggregateTimeout: 300 },
              (_, stats) => console.log(stats.toString({ colors: true }))
          )

          process.on('SIGINT', function() {
              watcher.close(() => {
                  watcher.close(() => {
                      process.exit()
                      resolve()
                  })
              })
          })
      })
    : new Promise(resolve =>
          compiler.run((_, stats) => {
              console.log(stats.toString({ colors: true }))
              resolve()
          })
      )

promise.then()
// } else {
// eslint-disable-next-line @typescript-eslint/no-empty-function
// const watcher = compiler.watch({ aggregateTimeout: 300 }, (_, stats) =>
//     console.log(stats.toString({ colors: true }))
// )

// process.on('SIGINT', function() {
//     watcher.close(() => process.exit())
// })
// }
