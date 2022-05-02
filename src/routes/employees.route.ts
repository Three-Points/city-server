import { Router, Request, Response, NextFunction } from 'express'

import pagination from '@middlewares/pagination.middleware'
import { success } from '@middlewares/response.middleware'
import wrapper from '@middlewares/wrapper.middleware'
import { getEmployees } from '@services/employee.service'
import { info } from '@utils/logger.util'
import validator from '@validators/employee.validator'

const router = Router()

/**
 * @name GET
 * @description Gets all employees by query. */
router.get(
    '/',
    validator,
    pagination,
    wrapper(async (req: Request, res: Response, next: NextFunction) => {
        info('GET /employees')
        res.locals.results = await getEmployees(req.query, res.locals.info)
        next()
    }),
    success
)

export default router
