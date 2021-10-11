import { ExtensionOptimization } from '../types/extendability'

export const defaultOptimization: ExtensionOptimization = () => ({
    splitChunks: {
        chunks: 'all',
    },
    runtimeChunk: {
        name: 'runtime',
    },
})
