import { Request, Response, NextFunction } from 'express'
import { SERVER_URL } from '@config/env'

/**
 * @description Create an info object as pagination response. */
export default (
    { query, baseUrl }: Request,
    res: Response,
    next: NextFunction
) => {
    const pages = Math.ceil(res.locals?.count / 10)
    const page = Number(query?.page || 1)
    res.locals.info = {
        page,
        next: page < pages ? `${SERVER_URL}${baseUrl}?page=${page + 1}` : null,
        prev:
            page > 1 && page <= pages
                ? `${SERVER_URL}${baseUrl}?page=${page - 1}`
                : null,
    }
    next()
}
