export const defaultBabelConfig = (configPath: string) => ({
    extends: configPath,
    presets: ['@babel/preset-typescript'],
})
