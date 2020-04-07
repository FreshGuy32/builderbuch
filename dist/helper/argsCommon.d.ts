declare type Environments = 'prod' | 'stg' | 'dev';
export declare const argsCommon: {
    readonly entry: {
        readonly type: "string";
        readonly default: string;
        readonly alias: "e";
    };
    readonly output: {
        readonly type: "string";
        readonly default: string;
        readonly alias: "o";
    };
    readonly plugins: {
        readonly type: "string";
        readonly default: string;
    };
    readonly rules: {
        readonly type: "string";
        readonly default: string;
    };
    readonly environment: {
        readonly type: "string";
        readonly choices: Environments[];
        readonly default: Environments;
    };
    readonly basePath: {
        readonly type: "string";
        readonly default: string;
    };
    readonly mode: {
        readonly type: "string";
        readonly choices: ("development" | "production")[];
        readonly default: "development" | "production";
    };
};
export {};
