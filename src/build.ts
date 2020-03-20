import webpack from 'webpack'
import createConfig from './webpack/webpack.config'
import { argv } from './helper/parsedArgs'

const compiler = webpack(createConfig(argv))

if (argv.watch) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    compiler.run(() => {})
} else {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    compiler.watch({ aggregateTimeout: 300 }, () => {})
}
