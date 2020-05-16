import {
    ExtensionRules,
    ExtensionRuleOverride,
    ExtensionRuleAdditon,
} from '../types/extendability'
import { PossibleArgs } from '../types/args'
import { RuleSetRule } from 'webpack'
import { defaultBabelConfig } from './defaultBabelConfig'
import { resolve } from 'path'

export const rules = async (
    extensionRules: ExtensionRules,
    args: PossibleArgs
) => {
    const additionalRules = extensionRules(args)

    const additions = additionalRules.filter(
        (value): value is ExtensionRuleAdditon => value.mode === 'addition'
    )
    const overrides = additionalRules.filter(
        (value): value is ExtensionRuleOverride => value.mode === 'override'
    )

    const rules: RuleSetRule[] = [
        {
            test: /\.(js|ts)x?$/i,
            use: ['source-map-loader'],
            enforce: 'pre',
        },
        {
            test: /\.(js|ts)x?$/i,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    ...defaultBabelConfig(resolve(args.basePath, '.babelrc')),
                    envName: args.environment,
                },
            },
        },
        ...additions.map(({ value }) => value),
    ]

    const styleRule = overrides.find(({ name }) => name === 'styles')
    rules.push(
        styleRule?.value ?? {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        }
    )

    return rules
}
