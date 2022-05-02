import supertest from 'supertest'
import server from '@src/server'

const request = supertest(server)

describe('GET /api/employee', () => {
    it('should return the oldest employee', async () => {
        const { body } = await request
            .get('/api/employee')
            .query({ oldest: true })
        console.log(body)
        expect(body).toEqual(
            expect.objectContaining({
                name: expect.any(String),
                age: expect.any(Number),
                phone: expect.objectContaining({
                    personal: expect.stringMatching(/[0-9]{3}(-[0-9]{3}){2}/),
                    work: expect.stringMatching(/[0-9]{3}(-[0-9]{3}){2}/),
                    ext: expect.stringMatching(/([0-9]){4}/),
                }),
                privileges: expect.stringMatching(/^(user|admin)$/),
                favorites: expect.objectContaining({
                    artist: expect.stringMatching(
                        /^(Picasso|Miro|Cassatt|Chagall|Noguchi)$/
                    ),
                    food: expect.any(String),
                }),
                finished: expect.arrayContaining([expect.any(Number)]),
                badges: expect.arrayContaining([
                    expect.stringMatching(/^(blue|black|green|orange)$/),
                ]),
                points: expect.arrayContaining([
                    expect.objectContaining({
                        points: expect.any(Number),
                        bonus: expect.any(Number),
                    }),
                ]),
            })
        )
    })
})

describe('POST /api/employee', () => {
    it('should return 201 Created', async () => {
        const response = await request.post('/api/employee').send({
            employee: {
                name: 'Emmanuel',
                age: 27,
                phone: {
                    personal: '123-456-789',
                    work: '123-789-456',
                    ext: '9876',
                },
                privileges: 'admin',
                favorites: {
                    artist: 'Miro',
                    food: 'tacos',
                },
                finished: [20, 4],
                badges: ['blue', 'orange'],
                points: [
                    {
                        points: 67,
                        bonus: 10,
                    },
                    {
                        points: 36,
                        bonus: 50,
                    },
                ],
            },
        })
        expect(response.status).toBe(201)
    })
})
