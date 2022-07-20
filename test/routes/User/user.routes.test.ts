import supertest from 'supertest'
import Prisma from '@libs/Prisma'
import server from '@src/server'
import * as Mailer from '@services/mailer.service'

const request = supertest(server)

let adminToken: string
let userToken: string
const userRequest = {
    name: 'Emmanuel',
    email: 'rorem.94@gmail.com',
    password: 'iuPDQZ2oQt',
    bio: 'A little bio description',
}
const userResponse = {
    id: 1,
    name: 'Emmanuel',
    email: 'rorem.94@gmail.com',
    password: 'iuPDQZ2oQt',
    bio: 'A little bio description',
    createdAt: '2022-05-06T15:00:35.469Z',
    updatedAt: '2022-05-06T15:00:35.469Z',
}

beforeAll(async () => {
    await request
        .post('/api/login')
        .send({
            email: 'gcluley0@cafepress.com',
            password: 'dj61lZ',
        })
        .then(({ body }) => (adminToken = body.token))
    await request
        .post('/api/login')
        .send({
            email: 'lblann4@weebly.com',
            password: 'k9IZKrlbYaQ',
        })
        .then(({ body }) => (userToken = body.token))
})

describe('POST /api/user', () => {
    jest.spyOn(Prisma.prototype, 'create')
        .mockImplementationOnce(() => Promise.resolve(userResponse))
        .mockImplementationOnce(() => Promise.resolve(userResponse))
    jest.spyOn(Mailer, 'sendVerificationEmail')
        .mockImplementationOnce(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.resolve())

    it('should return 201 OK', async () => {
        const { status } = await request
            .post('/api/user')
            .send(userRequest)
            .set('Authorization', adminToken)
        expect(status).toBe(201)
    })
    it('should return 401 Unauthorized', async () => {
        const { status } = await request
            .post('/api/user')
            .set('Authorization', userToken)
        expect(status).toBe(401)
    })
    it('should return a valid response as result', async () => {
        const { body } = await request
            .post('/api/user')
            .send(userRequest)
            .set('Authorization', adminToken)
        expect(body).toEqual(userResponse)
    })
})

describe('GET /api/user', () => {
    it('should return 200 OK', async () => {
        const { status } = await request
            .get('/api/user')
            .set('Authorization', userToken)
        expect(status).toBe(200)
    })
    it('should return a valid response as result', async () => {
        const { body } = await request
            .get('/api/user')
            .set('Authorization', adminToken)
        expect(body).toEqual(
            expect.objectContaining({
                name: expect.any(String),
                email: expect.any(String),
                bio: expect.any(String),
                active: expect.any(Boolean),
            })
        )
    })
    it('should return 401 Unauthorized', async () => {
        const { status } = await request
            .get('/api/user')
            .set('Authorization', '')
        expect(status).toBe(401)
    })
})

describe('GET /api/user/:id', () => {
    it('should return 200 OK', async () => {
        const { status } = await request
            .get('/api/user/1')
            .set('Authorization', adminToken)
        expect(status).toBe(200)
    })
    it('should return 400 Bad Request', async () => {
        const { status } = await request
            .get('/api/user/0')
            .set('Authorization', adminToken)
        expect(status).toBe(400)
    })
    it('should return 401 Unauthorized', async () => {
        const { status } = await request
            .get('/api/user/1')
            .set('Authorization', userToken)
        expect(status).toBe(401)
    })
    it('should return 404 Not Found', async () => {
        jest.spyOn(Prisma.prototype, 'findUnique').mockImplementationOnce(() =>
            Promise.resolve(null)
        )
        const { status } = await request
            .get('/api/user/20')
            .set('Authorization', adminToken)
        expect(status).toBe(404)
    })
    it('should return a valid response as result', async () => {
        const { body } = await request
            .get('/api/user/1')
            .set('Authorization', adminToken)
        expect(body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                email: expect.any(String),
                bio: expect.any(String),
                active: expect.any(Boolean),
            })
        )
    })
})

describe('PATCH /api/user', () => {
    jest.spyOn(Prisma.prototype, 'update')
        .mockImplementationOnce(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.resolve(userResponse))
    it('should return 200 OK', async () => {
        const { status } = await request
            .patch('/api/user')
            .send({
                bio: 'Another description',
            })
            .set('Authorization', userToken)
        expect(status).toBe(200)
    })
    it('should return 400 Bad Request', async () => {
        const { status } = await request
            .patch('/api/user')
            .send({
                bio: 123,
            })
            .set('Authorization', adminToken)
        expect(status).toBe(400)
    })
    it('should return 401 Unauthorized', async () => {
        const { status } = await request.patch('/api/user').send({
            bio: 'Another description',
        })
        expect(status).toBe(401)
    })
})

describe('PATCH /api/user/:id', () => {
    jest.spyOn(Prisma.prototype, 'update').mockImplementationOnce(() =>
        Promise.resolve()
    )
    it('should return 200 OK', async () => {
        const { status } = await request
            .patch('/api/user/1')
            .send({
                bio: 'Another description',
            })
            .set('Authorization', adminToken)
        expect(status).toBe(200)
    })
    it('should return 401 Unauthorized', async () => {
        const { status } = await request
            .patch('/api/user/1')
            .send({
                bio: 'Another description',
            })
            .set('Authorization', userToken)
        expect(status).toBe(401)
    })
})

describe('DELETE /api/user', () => {
    jest.spyOn(Prisma.prototype, 'delete').mockImplementationOnce(() =>
        Promise.resolve()
    )
    it('should return 204 OK No Content', async () => {
        const { status } = await request
            .delete('/api/user/1')
            .set('Authorization', adminToken)
        expect(status).toBe(204)
    })
    it('should return 400 Bad Request', async () => {
        const { status } = await request.delete('/api/user/0')
        expect(status).toBe(400)
    })
    it('should return 401 Unauthorized', async () => {
        const { status } = await request
            .delete('/api/user/1')
            .set('Authorization', userToken)
        expect(status).toBe(401)
    })
})
