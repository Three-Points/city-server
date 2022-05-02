import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

import ErrorServer from '@controllers/ErrorServer.controller'
import {
    age,
    badges,
    favorites,
    finished,
    name,
    oldest,
    phone,
    points,
    privileges,
} from './base.validator'
import { page } from './query.validator'

const request = Joi.object({
    query: {
        name,
        badges,
        oldest,
        page,
        privileges,
    },
    employee: {
        name,
        age,
        phone,
        privileges,
        favorites,
        finished,
        badges,
        points,
    },
})

/**
 * @description Validate the payload of the employee.
 * @throws {Error} Trigger an BAD_REQUEST error if the payload is not valid. */
export default (req: Request, _: Response, next: NextFunction) => {
    const { error } = request.validate({
        query: req.query,
        ...req.body,
    })
    error && !req.body?.employee
        ? next(new ErrorServer('BAD_REQUEST', error.message))
        : next()
}
