import { Router, Request, Response, NextFunction } from 'express'

import { success } from '@middlewares/response.middleware'
import wrapper from '@middlewares/wrapper.middleware'
import { getEmployee, createEmployee } from '@services/employee.service'
import { info } from '@utils/logger.util'
import validator from '@validators/employee.validator'

const router = Router()

/**
 * @name GET
 * @description Gets an employee. */
router.get(
    '/',
    validator,
    wrapper(async (_: Request, res: Response, next: NextFunction) => {
        info('GET /employee')
        res.locals.data = await getEmployee()
        next()
    }),
    success
)

/**
 * @name POST
 * @description Creates an employee. */
router.post(
    '/',
    validator,
    wrapper(async (req: Request, res: Response, next: NextFunction) => {
        info('POST /employee')
        res.locals.data = await createEmployee(req.body.employee)
        next()
    }),
    success
)

export default router
