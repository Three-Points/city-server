import supertest from 'supertest'

import server from '@src/server'

const request = supertest(server)

describe('GET /api/employees', () => {
    it('should return 200 OK', async () => {
        const { status } = await request.get('/api/employees')
        expect(status).toBe(200)
    })
    it('should return a valid employee structure', async () => {
        const { body } = await request.get('/api/employees')
        expect(body?.results).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    age: expect.any(Number),
                    phone: expect.objectContaining({
                        personal: expect.stringMatching(
                            /[0-9]{3}(-[0-9]{3}){2}/
                        ),
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
                }),
            ])
        )
    })

    it('should return a employees collection', async () => {
        const { body } = await request.get('/api/employees').query({ page: 1 })
        expect(body.results.length).toBe(2)
    })
    it('should throw an error bad request by page', async () => {
        const response = await request.get('/api/employees').query({ page: 0 })
        expect(response.status).toBe(400)
    })

    it('should return all employess by privileges', async () => {
        const { body } = await request
            .get('/api/employees')
            .query({ privileges: 'user' })
        expect(body.results).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    age: expect.any(Number),
                    phone: expect.objectContaining({
                        personal: expect.stringMatching(
                            /[0-9]{3}(-[0-9]{3}){2}/
                        ),
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
                }),
            ])
        )
    })
    it('should throw an error bad request by privileges', async () => {
        const response = await request
            .get('/api/employees')
            .query({ privileges: 'cheff' })
        expect(response.status).toBe(400)
    })

    it('should return all employess by name', async () => {
        const { body } = await request
            .get('/api/employees')
            .query({ name: 'sue' })
        expect(body.results).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    age: expect.any(Number),
                    phone: expect.objectContaining({
                        personal: expect.stringMatching(
                            /[0-9]{3}(-[0-9]{3}){2}/
                        ),
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
                }),
            ])
        )
    })
    it('should throw an error bad request by name', async () => {
        const response = await request.get('/api/employees').query('name=')
        expect(response.status).toBe(400)
    })

    it('should return all employess by badges', async () => {
        const { body } = await request
            .get('/api/employees')
            .query('badges[]=black')
        console.log(body.results)

        expect(body.results).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    age: expect.any(Number),
                    phone: expect.objectContaining({
                        personal: expect.stringMatching(
                            /[0-9]{3}(-[0-9]{3}){2}/
                        ),
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
                }),
            ])
        )
    })
    it('should throw an error bad request by badges', async () => {
        const response = await request
            .get('/api/employees')
            .query({ badges: 'black' })
        expect(response.status).toBe(400)
    })
})
