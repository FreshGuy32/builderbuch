import { moduleIsCorrect } from '../../src/helper/moduleIsCorrect'

describe('Test wth different types', () => {
    test('object', () => expect(moduleIsCorrect<'plugins'>({})).toBeFalsy())
    test('array', () => expect(moduleIsCorrect<'plugins'>([])).toBeFalsy())
    test('string', () => expect(moduleIsCorrect<'plugins'>('test')).toBeFalsy())
    test('number', () => expect(moduleIsCorrect<'plugins'>(1)).toBeFalsy())
    test('boolean', () => expect(moduleIsCorrect<'plugins'>(true)).toBeFalsy())
})

describe('Test with object module, but it has the wrong default export', () => {
    test('object', () =>
        expect(
            moduleIsCorrect<'plugins'>({ default: {} })
        ).toBeFalsy())
    test('empty array', () =>
        expect(moduleIsCorrect<'plugins'>([])).toBeFalsy())
    test('string', () =>
        expect(
            moduleIsCorrect<'plugins'>({ default: 'test' })
        ).toBeFalsy())
    test('number', () =>
        expect(
            moduleIsCorrect<'plugins'>({ default: 1 })
        ).toBeFalsy())
    test('boolean', () =>
        expect(
            moduleIsCorrect<'plugins'>({ default: true })
        ).toBeFalsy())
})

describe('Test with object module and it has the right default export', () => {
    test('object', () =>
        expect(
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            moduleIsCorrect<'plugins'>({ default: () => {} })
        ).toBeTruthy())
})
