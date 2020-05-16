const mockReadDir = jest.fn<Promise<string[]>, [string | Buffer]>()
jest.mock(
    'fs-extra',
    (): Partial<typeof import('fs-extra')> => ({
        readdir: mockReadDir,
    })
)

import { findClosestPackageFile } from '../../src/helper/findClosestPackageFile'

describe('Test package.json file on different layers', () => {
    test('package.json file found, but its named weird', async () => {
        mockReadDir.mockImplementation(() => Promise.resolve(['PackAGe.jsoN']))

        const res = await findClosestPackageFile('C:/mock/1/2/3/4/5/6/7/8/9')
        expect(res).toBeTruthy()
    })
    test('No package.json file found', async () => {
        mockReadDir.mockImplementation(() => Promise.resolve([]))

        const res = await findClosestPackageFile('C:/mock/1/2/3/4/5/6/7/8/9')
        expect(res).toBeFalsy()
    })
    test('package.json file is immediately found', async () => {
        mockReadDir.mockImplementation(() => Promise.resolve(['package.json']))

        const res = await findClosestPackageFile('C:/mock/1/2/3/4/5/6/7/8/9/10')
        expect(res).toBeTruthy()
    })
    test('package.json file is found on last iteration', async () => {
        mockReadDir.mockImplementation(path =>
            Promise.resolve(
                typeof path === 'string' && path.endsWith('1')
                    ? ['package.json', 'test.js', 'package.js']
                    : []
            )
        )

        const res = await findClosestPackageFile('C:/mock/1/2/3/4/5/6/7/8/9/10')
        expect(res).toBeTruthy()
    })
})
