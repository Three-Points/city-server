import Prisma from '@libs/Prisma'
import ErrorServer from '@controllers/ErrorServer.controller'

describe('MongoDB Unit Test', () => {
    const _client = new Prisma('post')
    test('should define a findUnique promise', () => {
        expect(_client.findUnique({})).toBeDefined()
    })
    test('should define a findMany promise', () => {
        expect(_client.findMany({})).toBeDefined()
    })
    test('should define a count promise', () => {
        expect(_client.count()).toBeDefined()
    })
    test('should define a create promise', () => {
        expect(_client.create({})).toBeDefined()
    })
    test('should define a update promise', () => {
        expect(_client.update({})).toBeDefined()
    })
    test('should define a delete promise', () => {
        expect(_client.delete({})).toBeDefined()
    })
    test('should throw an SERVER error', async () => {
        try {
            const _profile = new Prisma('profile')
            await _profile.count()
        } catch (error) {
            expect(error).toBeInstanceOf(ErrorServer)
        }
    })
})
