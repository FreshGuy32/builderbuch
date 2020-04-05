import { resolve } from 'path'
import {
    PossibleArguments,
    ExtendableAdditon,
    ExtendableOverride,
    OverrideableRuleNames,
} from '../types'
import { getAdditionalRules } from '../helper/getAdditional'
import { RuleSetRule } from 'webpack'

export const rules = async (args: PossibleArguments) => {
    const additionalRules = (await getAdditionalRules(args)) ?? []

    const additions = additionalRules.filter(
        (value): value is ExtendableAdditon<RuleSetRule> =>
            value.type === 'addition'
    )
    const overrides = additionalRules.filter(
        (
            value
        ): value is ExtendableOverride<RuleSetRule, OverrideableRuleNames> =>
            value.type === 'override'
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
                    extends: resolve(args.basePath, '.babelrc'),
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
