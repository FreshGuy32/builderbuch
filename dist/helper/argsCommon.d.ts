declare type Environments = 'prod' | 'stg' | 'dev'
export declare const argsCommon: {
    readonly entry: {
        readonly type: 'string'
        readonly default: string
        readonly alias: 'e'
        readonly description: 'Entrypoint into the application for webpack.'
    }
    readonly output: {
        readonly type: 'string'
        readonly default: string
        readonly alias: 'o'
        readonly description: 'Path for the webpack outputs.'
    }
    readonly plugins: {
        readonly type: 'string'
        readonly default: string
        readonly description: 'Path to the plugins file that should be loaded.'
    }
    readonly rules: {
        readonly type: 'string'
        readonly default: string
        readonly description: 'Path to the rules file that should be loaded.'
    }
    readonly environment: {
        readonly type: 'string'
        readonly choices: Environments[]
        readonly default: Environments
        readonly description: 'Environment for Browserlist and also gets exposed via Webpack into the build.'
    }
    readonly basePath: {
        readonly type: 'string'
        readonly default: string
        readonly description: 'Base path from where everything else starts. Is used for entry, output, plugins and rules options.'
    }
    readonly mode: {
        readonly type: 'string'
        readonly choices: ('development' | 'production')[]
        readonly default: 'development' | 'production'
        readonly description: 'Webpack mode and also gets exposed via Webpack into the build.'
    }
}
export {}
