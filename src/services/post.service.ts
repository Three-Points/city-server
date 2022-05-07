import PostController from '@controllers/Post.controller'
import { TPPost } from '@models/Post/Post.entity'

const postController = new PostController()

/**
 * @description Find all posts paginated.
 * @param {number} [page] Optional page number.
 * @returns Posts array. */
export const getPosts = (page?: number) => {
    return postController.findPosts({ page })
}

/**
 * @description Find post by id.
 * @param {number} id Post id.
 * @returns Post. */
export const getPostById = (id: number) => {
    return postController.findPost({ id })
}

/**
 * @description Create a post.
 * @param {TPPost} payload Payload to create a post.
 * @returns Post. */
export const createPost = (payload: TPPost) => {
    return postController.createPost(payload)
}

/**
 * @description Update a post.
 * @param {number} id Post id.
 * @param {TPPost} payload Payload to create a post.
 * @returns Post. */
export const updatePost = (id: number, payload: TPPost) => {
    return postController.updatePost({ id }, payload)
}

/**
 * @description Delete a post.
 * @param {number} id Post id.
 * @returns Post. */
export const deletePost = (id: number) => {
    return postController.deletePost({ id })
}
