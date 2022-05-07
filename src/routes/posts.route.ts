import { Router, Request, Response, NextFunction } from 'express'

import paginate from '@middlewares/pagination.middleware'
import { success } from '@middlewares/response.middleware'
import wrapper from '@middlewares/wrapper.middleware'
import { getPosts } from '@services/post.service'
import { info } from '@utils/logger.util'
import validator from '@validators/post.validator'

const router = Router()

/**
 * @description Get posts paginated by pages. */
router.get(
    '/',
    validator,
    wrapper(async (req: Request, res: Response, next: NextFunction) => {
        info('GET /posts')
        const page = Number(req.query?.page)
        ;[res.locals.results, res.locals.count] = await getPosts(page)
        next()
    }),
    paginate,
    success
)

export default router
