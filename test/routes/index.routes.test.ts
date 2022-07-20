import supertest from 'supertest'
import server from '@src/server'
import { encrypt } from '@utils/crypter.util'
import Prisma from '@libs/Prisma'
import UserController from '@controllers/User.controller'

let userToken: string
const request = supertest(server)
const loginRequest = {
    email: 'gcluley0@cafepress.com',
    password: 'dj61lZ',
}
beforeAll(async () => {
    await request
        .post('/api/login')
        .send({
            email: 'lblann4@weebly.com',
            password: 'k9IZKrlbYaQ',
        })
        .then(({ body }) => (userToken = body.token))
})

describe('GET /api', () => {
    it('should return 200 OK', async () => {
        const { status } = await request.get('/api')
        expect(status).toBe(200)
    })
    it('should show project name as Zentrity', async () => {
        const { body } = await request.get('/api')
        expect(body?.project).toBe('Zentrity')
    })
    it('should be in mode test', async () => {
        const { body } = await request.get('/api')
        expect(body?.mode).toBe('test')
    })
})

describe('POST /api/login', () => {
    it('should return 201 OK', async () => {
        const { status } = await request.post('/api/login').send(loginRequest)
        expect(status).toBe(201)
    })
    it('should return 400 Bad Request', async () => {
        const { status } = await request.post('/api/login').send({})
        expect(status).toBe(400)
    })
    it('should return 401 Unauthorized by password not match', async () => {
        const { status } = await request.post('/api/login').send({
            email: 'gcluley0@cafepress.com',
            password: '123456',
        })
        expect(status).toBe(401)
    })
    it('should return 401 Unauthorized by not be active', async () => {
        jest.spyOn(UserController.prototype, 'findUser').mockImplementationOnce(
            () => Promise.resolve({ active: false })
        )
        const { status } = await request.post('/api/login').send({
            email: 'gcluley0@cafepress.com',
            password: 'dj61lZ',
        })
        expect(status).toBe(401)
    })
    it('should return a valid response as result', async () => {
        const { body } = await request.post('/api/login').send(loginRequest)
        expect(body?.token).toBeTruthy()
    })
})

describe('GET /api/verify', () => {
    it('should return 200 OK', async () => {
        const token = encrypt('gcluley0@cafepress.com')
        const { status } = await request.get('/api/verify').query({ token })
        expect(status).toBe(200)
    })
})
