import Joi from 'joi'

export const author = Joi.string().min(5).max(15).messages({
    'string.base': 'Author must be a string.',
    'string.min': 'Author must be at least 5.',
    'string.max': 'Author must be at most 15.',
})

export const id = Joi.alternatives(
    Joi.string().regex(/^[1-9]+[0-9]*$/),
    Joi.number().integer().min(1)
).messages({
    'string.regex': 'Id must be a valid value.',
    'number.integer': 'Id must be a valid value.',
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
