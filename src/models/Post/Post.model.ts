import { IPost, TQPost, TPPost } from './Post.entity'
import Model from '@models/Model'

/**
 * @class Post
 * @extends Model
 * @description Post Model Class. */
export default class Post extends Model<IPost, TQPost, TPPost> {
    /**
     * @constructor
     * @description Generate link to Prisma model. */
    constructor() {
        super('post')
    }

    /**
     * @description Find pool of posts.
     * @param {TQPost} query Query to find posts.
     * @returns Post array. */
    async findMany(query?: TQPost) {
        return [
            await this.client.findMany({
                ...this.pagination(query?.page || 1),
            }),
            await this.client.count(),
        ]
    }

    /**
     * @description Find a post.
     * @param {TQPost} query Query to find posts.
     * @returns Post. */
    async findUnique({ id }: TQPost) {
        return await this.client.findUnique({ where: { id } })
    }

    /**
     * @description Create a post.
     * @param {TQPost} payload Payload to create a post.
     * @returns Post. */
    async create(payload: TPPost) {
        return await this.client.create({ data: payload })
    }

    /**
     * @description Update a post.
     * @param {TQPost} query Query to find posts.
     * @param {TQPost} payload Payload to create a post.
     * @returns Post. */
    async update({ id }: TQPost, payload: TPPost) {
        return await this.client.update({ where: { id }, data: payload })
    }

    /**
     * @description Delete a post.
     * @param {TQPost} query Query to find posts.
     * @returns Post. */
    async delete({ id }: TQPost) {
        return await this.client.delete({ where: { id } })
    }
}
