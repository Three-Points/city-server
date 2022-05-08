import { Router, Request, Response, NextFunction } from 'express'

import { success } from '@middlewares/response.middleware'
import wrapper from '@middlewares/wrapper.middleware'
import {
    getPostById,
    createPost,
    updatePost,
    deletePost,
} from '@services/post.service'
import { info } from '@utils/logger.util'
import validator from '@validators/post.validator'

const router = Router()

/**
 * @description Create a post. */
router.post(
    '/',
    validator,
    wrapper(async (req: Request, res: Response, next: NextFunction) => {
        info('POST /post')
        res.locals.data = await createPost(req.body)
        next()
    }),
    success
)

/**
 * @description Get a post by id. */
router.get(
    '/:id',
    validator,
    wrapper(async (req: Request, res: Response, next: NextFunction) => {
        info('GET /post/:id')
        res.locals.data = await getPostById(Number(req.params.id))
        next()
    }),
    success
)

/**
 * @description Update a post. */
router.patch(
    '/:id',
    validator,
    wrapper(async (req: Request, res: Response, next: NextFunction) => {
        info('PATCH /post/:id')
        res.locals.data = await updatePost(Number(req.params.id), req.body)
        next()
    }),
    success
)

/**
 * @description Delete a post. */
router.delete(
    '/:id',
    wrapper(async (req: Request, res: Response, next: NextFunction) => {
        info('DELETE /post/:id')
        res.locals.data = await deletePost(Number(req.params.id))
        next()
    }),
    success
)

export default router
