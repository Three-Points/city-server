import supertest from 'supertest'

import server from '@src/server'

const request = supertest(server)

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
