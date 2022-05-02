import Joi from 'joi'

export const page = Joi.number().integer().min(1)
