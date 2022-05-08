import supertest from 'supertest'
import server from '@src/server'

const request = supertest(server)

const loginRequest = {
    email: 'gcluley0@cafepress.com',
    password: 'dj61lZ',
}

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
    it('should return 200 OK', async () => {
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
    it('should return a valid response as result', async () => {
        const { body } = await request.post('/api/login').send(loginRequest)
        expect(body?.token).toBeTruthy()
    })
})
