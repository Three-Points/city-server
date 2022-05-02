import { Request, Response, NextFunction } from 'express'

import { IFilters } from '@libs/prisma/Prisma.entity'

/**
 * @description Create a info object as pagination. */
export default ({ query }: Request, res: Response, next: NextFunction) => {
    if (query?.page) {
        res.locals.info = {
            page: Number(query?.page),
        } as IFilters
    }
    next()
}
