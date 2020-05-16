import {
    ExtensionRuleOverride,
    ExtensionRuleAdditon,
} from '../types/extendability'
import { RuleSetRule } from 'webpack'
import { defaultBabelConfig } from './defaultBabelConfig'
import { resolve } from 'path'
import { IBuildParameters } from '../types/build'

export const rules = async ({
    basePath,
    environment,
    extensionRules,
    mode,
}: Pick<
    IBuildParameters,
    'type' | 'basePath' | 'environment' | 'mode' | 'extensionRules'
>) => {
    const additionalRules = extensionRules(basePath, environment, mode)

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
            loader: 'babel-loader',
            options: {
                ...defaultBabelConfig(resolve(basePath, '.babelrc')),
                envName: environment,
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
