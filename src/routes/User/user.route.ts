import { Router, Request, Response, NextFunction } from 'express'

import auth from '@middlewares/auth.middleware'
import { success } from '@middlewares/response.middleware'
import wrapper from '@middlewares/wrapper.middleware'
import {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '@services/user.service'
import { verify } from '@services/auth.service'
import { info } from '@utils/logger.util'
import { authorization, validator } from '@validators/user.validator'

const router = Router()

/**
 * @description Get a personal profile. */
router.get(
    '/',
    authorization,
    validator,
    wrapper(async (req: Request, res: Response, next: NextFunction) => {
        info('GET /user')
        res.locals.data = await verify(req.headers.authorization as string)
        next()
    }),
    success
)

/**
 * @description Create a user. */
router.post(
    '/',
    validator,
    wrapper(auth),
    wrapper(async (req: Request, res: Response, next: NextFunction) => {
        info('POST /user')
        res.locals.data = await createUser(req.body)
        next()
    }),
    success
)

/**
 * @description Update personal information. */
router.patch(
    '/',
    authorization,
    validator,
    wrapper(async (req: Request, res: Response, next: NextFunction) => {
        info('PATCH /user')
        const user = await verify(req.headers.authorization as string)
        res.locals.data = await updateUser(Number(user.id), req.body)
        next()
    }),
    success
)

/**
 * @description Get a user. */
router.get(
    '/:id',
    validator,
    wrapper(auth),
    wrapper(async (req: Request, res: Response, next: NextFunction) => {
        info('GET /user/:id')
        res.locals.data = await getUserById(Number(req.params.id))
        next()
    }),
    success
)

/**
 * @description Update a user. */
router.patch(
    '/:id',
    validator,
    wrapper(auth),
    wrapper(async (req: Request, res: Response, next: NextFunction) => {
        info('PATCH /user/:id')
        res.locals.data = await updateUser(Number(req.params.id), req.body)
        next()
    }),
    success
)

/**
 * @description Delete a user. */
router.delete(
    '/:id',
    validator,
    wrapper(auth),
    wrapper(async (req: Request, res: Response, next: NextFunction) => {
        info('DELETE /user/:id')
        res.locals.data = await deleteUser(Number(req.params.id))
        next()
    }),
    success
)

export default router
