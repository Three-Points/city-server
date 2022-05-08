import { Router, Response, NextFunction } from 'express'

import server from '../server'
import { success } from '@middlewares/response.middleware'
import wrapper from '@middlewares/wrapper.middleware'
import { login } from '@services/auth.service'
import { activeUser } from '@services/user.service'
import { info } from '@utils/logger.util'
import { validatorLogin } from '@validators/user.validator'

const router = Router()

/**
 * @name GET
 * @description Gets project info as health route. */
router.get(
    '/',
    wrapper(async (_, res: Response, next: NextFunction) => {
        info('GET /api')
        res.locals.data = {
            project: 'Zentrity',
            mode: server.get('mode'),
            version: server.get('version'),
        }
        next()
    }),
    success
)

/**
 * @name POST
 * @description Login. */
router.post(
    '/login',
    validatorLogin,
    wrapper(async (req, res: Response, next: NextFunction) => {
        info('POST /api/login')
        const { email, password } = req.body
        res.locals.data = await login(email, password)
        next()
    }),
    success
)

/**
 * @name GET
 * @description Verify. */
router.get(
    '/verify',
    wrapper(async (req, res: Response, next: NextFunction) => {
        info('GET /api/verify')
        const { token } = req.query
        res.locals.data = await activeUser(token as string)
        next()
    }),
    success
)

export default router
