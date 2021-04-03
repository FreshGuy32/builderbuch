import { ExtensionResolve } from '../types/extendability'

export const defaultResolve: ExtensionResolve = () => ({
    extensions: ['.tsx', '.ts', '.js', '.css', '.pcss'],
})
