import supertest from 'supertest'
import Prisma from '@libs/Prisma'
import server from '@src/server'

const request = supertest(server)

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
jest.spyOn(Prisma.prototype, 'create')
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.resolve(userResponse))
jest.spyOn(Prisma.prototype, 'update')
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.resolve(userResponse))
jest.spyOn(Prisma.prototype, 'delete').mockImplementationOnce(() =>
    Promise.resolve()
)

//TODO Complement User tests

describe('POST /api/user', () => {
    it('should return 201 OK', async () => {})
    it('should return 401 Unauthorized', async () => {})
    it('should return a valid response as result', async () => {})
})

describe('GET /api/user', () => {
    it('should return 200 OK', async () => {})
    it('should return 400 Bad Request', async () => {})
    it('should return 401 Unauthorized', async () => {})
    it('should return a valid response as result', async () => {})
})

describe('PATCH /api/user', () => {
    it('should return 200 OK', async () => {})
    it('should return 400 Bad Request', async () => {})
    it('should return 401 Unauthorized', async () => {})
    it('should return a valid response as result', async () => {})
})

describe('DELETE /api/user', () => {
    it('should return 204 OK No Content', async () => {})
    it('should return 400 Bad Request', async () => {})
    it('should return 401 Unauthorized', async () => {})
})
