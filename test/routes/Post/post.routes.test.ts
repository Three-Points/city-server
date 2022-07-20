import supertest from 'supertest'
import Prisma from '@libs/Prisma'
import server from '@src/server'

const request = supertest(server)

const postRequest = {
    title: 'A Title',
    text: 'A Simple Text as Content',
    author: 'Smith',
}
const postResponse = {
    id: 1,
    title: 'A Title',
    text: 'A Simple Text as Content',
    author: 'Smith',
    createdAt: '2022-05-06T15:00:35.469Z',
    updatedAt: '2022-05-06T15:00:35.469Z',
}

describe('POST /api/post', () => {
    jest.spyOn(Prisma.prototype, 'create')
        .mockImplementationOnce(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.resolve(postResponse))

    it('should return 200 OK', async () => {
        const { status } = await request.post('/api/post')
        expect(status).toBe(201)
    })
    it('should return the result operation', async () => {
        const { body } = await request.post('/api/post').send(postRequest)
        expect(body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                title: expect.any(String),
                text: expect.any(String),
                author: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            })
        )
    })
})

describe('GET /api/post', () => {
    it('should return 200 OK', async () => {
        const { status } = await request.get('/api/post/1')
        expect(status).toBe(200)
    })
    it('should return 404 OK', async () => {
        const { status } = await request.get('/api/post/20')
        expect(status).toBe(404)
    })
    it('should return a valid response', async () => {
        const { body } = await request.get('/api/post/1')
        expect(body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                title: expect.any(String),
                text: expect.any(String),
                author: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            })
        )
    })
})

describe('PATCH /api/post', () => {
    jest.spyOn(Prisma.prototype, 'update')
        .mockImplementationOnce(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.resolve(postResponse))

    it('should return 200 OK', async () => {
        const { status } = await request.patch('/api/post/1')
        expect(status).toBe(200)
    })
    it('should return 400 Bad Request', async () => {
        const { status } = await request.patch('/api/post/0')
        expect(status).toBe(400)
    })
    it('should return a response operation', async () => {
        const { body } = await request.patch('/api/post/1').send(postRequest)
        expect(body).toEqual(
            expect.objectContaining({
                title: expect.any(String),
                text: expect.any(String),
                author: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            })
        )
    })
})

describe('DELETE /api/post', () => {
    jest.spyOn(Prisma.prototype, 'delete').mockImplementationOnce(() =>
        Promise.resolve()
    )

    it('should return 200 OK', async () => {
        const { status } = await request.delete('/api/post/1')
        expect(status).toBe(204)
    })
})
