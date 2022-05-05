import 'module-alias/register'
import { PrismaClient } from '@prisma/client'

import posts from '@db/mocks/post.mock'
import { IPost } from '@models/Post/Post.entity'
import { complete, info, fail } from '@utils/logger.util'

const _prisma = new PrismaClient()

/**
 * @description Create a new batch records in the database.
 * @param {string} name Model name.
 * @param {Array} collection Collection of records to be created. */
async function createBatch<TModel>(name: string, collection: Array<TModel>) {
    const model = Object.entries(_prisma).find(([key]) => key === name)
    if (!model) throw new Error(`Model ${name} not found`)
    await Promise.all(
        collection.map(async (item) => {
            await model[1].create({ data: item })
        })
    ).catch(({ message }) => fail(message))
    info(`${name} created`)
}

;(async () => {
    await createBatch<IPost>('post', posts)
})()
    .then(() => {
        _prisma.$disconnect()
        complete('Database seeded')
    })
    .catch((error) => {
        _prisma.$disconnect()
        fail(error)
    })
