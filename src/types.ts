import { WebpackStartConfigArgs } from './helper/parsedArgsStart'
import { WebpackBuildConfigArgs } from './helper/parsedArgsBuild'

export type PossibleArguments = WebpackBuildConfigArgs | WebpackStartConfigArgs
