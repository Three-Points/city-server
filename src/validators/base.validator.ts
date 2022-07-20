import Joi from 'joi'

export const active = Joi.boolean()

export const Authorization = Joi.string().required().messages({
    'string.empty': 'Unauthorized',
})

export const author = Joi.string().min(5).max(15).messages({
    'string.base': 'Author must be a string.',
    'string.min': 'Author must be at least 5.',
    'string.max': 'Author must be at most 15.',
})

export const bio = Joi.string().min(10).max(100).messages({
    'string.base': 'Bio must be a string.',
    'string.min': 'Bio must be at least 10.',
    'string.max': 'Bio must be at most 100.',
})

export const email = Joi.string().email().messages({
    'string.base': 'Email must be a string.',
    'string.email': 'Email must be a valid email.',
})

export const id = Joi.alternatives(
    Joi.string().regex(/^[1-9]+\d*$/),
    Joi.number().integer().min(1)
).messages({
    'string.regex': 'Id must be a valid value.',
    'number.integer': 'Id must be a valid value.',
})

export const name = Joi.string().min(3).max(15).messages({
    'string.base': 'Name must be a string.',
    'string.min': 'Name must be at least 3.',
    'string.max': 'Name must be at most 15.',
})

export const password = Joi.string().min(6).max(20).messages({
    'string.base': 'Password must be a string.',
    'string.min': 'Password must be at least 6.',
    'string.max': 'Password must be at most 20.',
})

export const role = Joi.string().valid('ADMIN', 'USER').messages({
    'string.base': 'Role must be a string.',
    'string.valid': 'Role must be a valid value.',
})

export const title = Joi.string().min(1).max(20).messages({
    'string.base': 'Title must be a string.',
    'string.min': 'Title must be at least 1.',
    'string.max': 'Title must be at most 20.',
})

export const text = Joi.string().min(1).max(150).messages({
    'string.base': 'Text must be a string.',
    'string.min': 'Text must be at least 1.',
    'string.max': 'Text must be at most 150.',
})
