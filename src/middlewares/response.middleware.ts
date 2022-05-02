import { Request, Response, NextFunction } from 'express'

import ErrorServer from '@controllers/ErrorServer.controller'
import { complete, fail } from '@utils/logger.util'

/**
 * @description Handler error response as express middleware. */
export const error = (
    err: ErrorServer,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { code, error, message } = err
    fail(error, message)
    res.status(code).send(message)
}

/**
 * @description Handler successful response as express middleware. */
export const success = (req: Request, res: Response, next: NextFunction) => {
    complete(`${req.method} operation`)
    res.status(req.method === 'POST' ? 201 : 200).json({
        ...(res.locals.info && { info: res.locals.info }),
        ...(res.locals.results && {
            results: res.locals.results,
        }),
        ...res.locals.data,
    })
}
