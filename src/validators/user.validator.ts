import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import ErrorServer from '@controllers/ErrorServer.controller'
import { Authorization, bio, email, id, name, password } from './base.validator'
import { page } from './query.validator'

const request = Joi.object({
    query: {
        page,
    },
    params: {
        id,
    },
    body: {
        bio,
        email,
        name,
        password,
    },
})

const authentication = Joi.object({
    email: email.required(),
    password: password.required(),
})

/**
 * @description Validate the payload of the user.
 * @throws {ErrorServer} Trigger an BAD_REQUEST error if the payload is not valid. */
export const validator = (req: Request, _: Response, next: NextFunction) => {
    const { error } = request.validate({
        query: req.query,
        params: req.params,
        body: req.body,
    })
    error ? next(new ErrorServer('BAD_REQUEST', error.message)) : next()
}

/**
 * @description TODO
 * @throws {ErrorServer} Trigger an BAD_REQUEST error if the payload is not valid. */
export const authorization = (
    req: Request,
    _: Response,
    next: NextFunction
) => {
    const { error } = Authorization.validate(req.headers.authorization)
    error ? next(new ErrorServer('UNAUTHORIZED', error.message)) : next()
}

/**
 * @description Validate the payload of the login.
 * @throws {ErrorServer} Trigger an BAD_REQUEST error if the payload is not valid. */
export const validatorLogin = (
    req: Request,
    _: Response,
    next: NextFunction
) => {
    const { error } = authentication.validate(req.body)
    error ? next(new ErrorServer('BAD_REQUEST', error.message)) : next()
}
