import { argsCommon } from './argsCommon'
export declare const buildArgv: {
    readonly type: 'build'
    readonly analyze: boolean
    readonly watch: boolean
    readonly entry: string
    readonly output: string
    readonly plugins: string
    readonly rules: string
    readonly environment: 'prod' | 'stg' | 'dev'
    readonly basePath: string
    readonly mode: 'development' | 'production'
    readonly _: string[]
    readonly $0: string
}
export declare type WebpackBuildConfigArgs = Pick<
    typeof buildArgv,
    keyof typeof argsCommon | 'analyze' | 'watch' | 'type'
>
