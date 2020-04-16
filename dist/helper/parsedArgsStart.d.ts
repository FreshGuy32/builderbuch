import { argsCommon } from './argsCommon'
export declare const startArgv: {
    readonly type: 'start'
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
export declare type WebpackStartConfigArgs = Pick<
    typeof startArgv,
    keyof typeof argsCommon | 'type'
>
