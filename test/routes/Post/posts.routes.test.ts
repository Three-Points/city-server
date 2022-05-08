import supertest from 'supertest'
import server from '@src/server'

const request = supertest(server)

describe('GET /api/posts', () => {
    it('should return 200 OK', async () => {
        const { status } = await request.get('/api/posts')
        expect(status).toBe(200)
    })
    it('should return the first pagination info', async () => {
        const { body } = await request.get('/api/posts').query({
            page: 1,
        })
        expect(body.info).toEqual(
            expect.objectContaining({
                page: expect.any(Number),
                next: expect.any(String),
                prev: null,
            })
        )
    })
    it('should return the last pagination info', async () => {
        const { body } = await request.get('/api/posts').query({
            page: 2,
        })
        expect(body.info).toEqual(
            expect.objectContaining({
                page: expect.any(Number),
                next: null,
                prev: expect.any(String),
            })
        )
    })
    it('should return a list of posts', async () => {
        const { body } = await request.get('/api/posts')
        expect(body.results).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    title: expect.any(String),
                    text: expect.any(String),
                    author: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                }),
            ])
        )
    })
})
