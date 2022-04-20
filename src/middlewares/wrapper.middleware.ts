import { Request, Response, NextFunction } from 'express'

type AsyncMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>
/**
 * @description Wrapper express middleware. */
export default (fn: AsyncMiddleware) =>
    (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next)
    }
