const mockPathExists = jest.fn<Promise<boolean>, [string]>()
jest.mock(
    'fs-extra',
    (): Partial<typeof import('fs-extra')> => ({
        pathExists: mockPathExists,
    })
)

import { checkIfConfigFilesExist } from '../../src/helper/checkIfConfigFilesExist'

describe('Always returns Promise of Array.', () => {
    beforeEach(() => mockPathExists.mockClear())
    test('Returns promise', async () => {
        mockPathExists.mockImplementationOnce(() => Promise.resolve(true))
        expect(checkIfConfigFilesExist('C:/mock')).toBeInstanceOf(Promise)
    })
    test('Returns promise of object', async () => {
        mockPathExists.mockImplementationOnce(() => Promise.resolve(true))

        const res = await checkIfConfigFilesExist('C:/mock')
        expect(res).toBeInstanceOf(Object)
    })
})

describe('When config files are found', () => {
    beforeEach(() => mockPathExists.mockClear())

    test('All config file paths are returned', async () => {
        mockPathExists.mockImplementation(() => Promise.resolve(true))

        const res = await checkIfConfigFilesExist('C:/mock')
        expect(Object.values(res).flat().length).toBe(10)
    })
    test('One of each config paths are returned', async () => {
        mockPathExists.mockImplementation(path =>
            Promise.resolve(
                /(\.babelrc|tsconfig|\.eslintrc)\.json/gi.test(path)
            )
        )

        const res = await checkIfConfigFilesExist('C:/mock')
        expect(Object.entries(res).every(([, val]) => val.length === 1)).toBe(
            true
        )
    })
})
