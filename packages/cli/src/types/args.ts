import { BuildParameters } from '@builderbuch/core/src/types/build'

export interface Arguments
    extends Omit<
        BuildParameters,
        'type' | 'extensionPlugins' | 'extensionRules' | 'configFiles'
    > {
    extension: string
    watch: boolean
}
