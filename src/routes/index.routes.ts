import { Router, Response, NextFunction } from 'express'

import server from '../server'
import { success } from '@middlewares/response.middleware'
import { info } from '@utils/logger.util'

const router = Router()

router.get(
    '/',
    (_, res: Response, next: NextFunction) => {
        info('GET /api')
        res.locals.data = {
            project: 'City',
            mode: server.get('mode'),
            version: server.get('version'),
        }
        next()
    },
    success
)

export default router
