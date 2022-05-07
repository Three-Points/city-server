import ErrorServer from '@controllers/ErrorServer.controller'
import Post from '@models/Post/Post.model'
import { TQPost, TPPost } from '@models/Post/Post.entity'

export default class PostController {
    private model = new Post()

    /**
     * @description Find posts.
     * @param {TQPost} query
     * @returns Posts array. */
    async findPosts(query?: TQPost) {
        return await this.model.findMany(query)
    }

    /**
     * @description Find a post.
     * @param {TQPost} query
     * @throws {ErrorServer} Post not found.
     * @returns Post. */
    async findPost(query: TQPost) {
        const post = await this.model.findUnique(query)
        if (!post) throw new ErrorServer('NOT_FOUND', 'Post not found.')
        return post
    }

    /**
     * @description Create a post.
     * @param {TPPost} payload
     * @returns Post. */
    async createPost(payload: TPPost) {
        return await this.model.create(payload)
    }

    /**
     * @description Update a post by id.
     * @param {TQPost} query
     * @param {TPPost} payload
     * @throws {ErrorServer} Post not found.
     * @returns Post. */
    async updatePost(query: TQPost, payload: TPPost) {
        await this.findPost(query)
        return await this.model.update(query, payload)
    }

    /**
     * @description Delete a post by id.
     * @param {TQPost} query
     * @throws {ErrorServer} Post not found.
     * @returns Post. */
    async deletePost(query: TQPost) {
        await this.findPost(query)
        return await this.model.delete(query)
    }
}
