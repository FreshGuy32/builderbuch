import webpack from 'webpack'
import createConfig from './webpack/webpack.config'

const compiler = webpack(createConfig(undefined, {}))

compiler.run((_err, stats) => {
    console.log(stats)
})
