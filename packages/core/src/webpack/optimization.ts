import { ExtensionOptimization } from '../types/extendability'

export const defaultOptimization: ExtensionOptimization = ({ mode }) => ({
    splitChunks: {
        chunks: 'all',
        name: mode === 'development',
    },
    runtimeChunk: {
        name: 'runtime',
    },
})
