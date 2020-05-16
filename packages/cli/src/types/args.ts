import { IBuildParameters } from '@freshguy32/builderbuch_core/src/types/build'

export interface IArguments
    extends Omit<
        IBuildParameters,
        | 'extension'
        | 'type'
        | 'publicPath'
        | 'extensionPlugins'
        | 'extensionRules'
    > {
    extension: string
    watch: boolean
}
