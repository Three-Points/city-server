import { Request, Response, NextFunction } from 'express'
import { authorizationByRole } from '@services/auth.service'

/**
 * @description Authentication middleware. */
export default async (req: Request, _: Response, next: NextFunction) => {
    await authorizationByRole(req.headers.authorization as string)
    next()
}
