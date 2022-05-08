import { Router, Request, Response, NextFunction } from 'express'

import paginate from '@middlewares/pagination.middleware'
import { success } from '@middlewares/response.middleware'
import wrapper from '@middlewares/wrapper.middleware'
import { getUsers } from '@services/user.service'
import { info } from '@utils/logger.util'
import { validator } from '@validators/user.validator'
import auth from '@middlewares/auth.middleware'

const router = Router()

/**
 * @description Get users paginated by pages. */
router.get(
    '/',
    validator,
    wrapper(auth),
    wrapper(async (req: Request, res: Response, next: NextFunction) => {
        info('GET /users')
        const page = Number(req.query?.page)
        ;[res.locals.results, res.locals.count] = await getUsers(page)
        next()
    }),
    paginate,
    success
)

export default router
