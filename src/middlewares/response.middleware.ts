import { Request, Response, NextFunction } from 'express'
import ErrorServer from '@controllers/ErrorServer.controller'
import { complete, fail } from '@utils/logger.util'

/**
 * @description Handler error response as express middleware. */
export const error = (
    err: ErrorServer,
    req: Request,
    res: Response,
    _: NextFunction
) => {
    const { code, error, message } = err
    fail(error, message)
    res.status(code).send(message)
}

/**
 * @description Handler successful response as express middleware. */
export const success = (req: Request, res: Response, _: NextFunction) => {
    complete(`${req.method} operation`)
    response[req.method](res)
}

/**
 * @description Handler response.
 * @param {string} method REST method. */
const response: { [key: string]: any } = {
    GET: (res: Response) => {
        complete('GET operation')
        res.status(200).json({
            ...(res.locals.info && { info: res.locals.info }),
            ...(res.locals.results && {
                results: res.locals.results,
            }),
            ...res.locals.data,
        })
    },
    PATCH: (res: Response) => {
        complete('GET operation')
        res.status(200).json(res.locals.data)
    },
    POST: (res: Response) => {
        complete('POST operation')
        res.status(201).json(res.locals.data)
    },
    DELETE: (res: Response) => {
        complete('DELETE operation')
        res.status(204).send()
    },
}
