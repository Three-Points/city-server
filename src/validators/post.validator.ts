import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import ErrorServer from '@controllers/ErrorServer.controller'
import { author, id, title, text } from './base.validator'
import { page } from './query.validator'

const request = Joi.object({
    query: {
        page,
    },
    params: {
        id,
    },
    body: {
        author,
        title,
        text,
    },
})

/**
 * @description Validate the payload of the post.
 * @throws {Error} Trigger an BAD_REQUEST error if the payload is not valid. */
export default (req: Request, _: Response, next: NextFunction) => {
    const { error } = request.validate({
        query: req.query,
        params: req.params,
        body: req.body,
    })
    error ? next(new ErrorServer('BAD_REQUEST', error.message)) : next()
}
