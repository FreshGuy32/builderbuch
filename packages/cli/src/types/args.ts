import { IBuildParameters } from '@freshguy32/builderbuch_core/src/types/build'

export interface IArguments
    extends Omit<
        IBuildParameters,
        | 'extension'
        | 'type'
        | 'extensionPlugins'
        | 'extensionRules'
        | 'configFiles'
    > {
    extension: string
    watch: boolean
}
