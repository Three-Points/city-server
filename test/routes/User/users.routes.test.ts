import supertest from 'supertest'
import AuthController from '@controllers/Auth.controller'
import server from '@src/server'

const request = supertest(server)

jest.spyOn(AuthController.prototype, 'authorizationByRole')
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.resolve())

describe('GET /api/users', () => {
    it('should return 200 OK', async () => {
        const { status } = await request.get('/api/users')
        expect(status).toBe(200)
    })
    it('should return the first pagination info', async () => {
        const { body } = await request.get('/api/users')
        expect(body.info).toEqual(
            expect.objectContaining({
                page: expect.any(Number),
                next: null,
                prev: null,
            })
        )
    })
    it('should return the last pagination info', async () => {
        const { body } = await request.get('/api/users?page=2')
        expect(body.info).toEqual(
            expect.objectContaining({
                page: expect.any(Number),
                next: null,
                prev: null,
            })
        )
    })
    it('should return a list of users', async () => {
        const { body } = await request.get('/api/users')
        expect(body.results).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    email: expect.any(String),
                    bio: expect.any(String),
                    active: expect.any(Boolean),
                    role: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                }),
            ])
        )
    })
})
