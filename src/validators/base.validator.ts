import Joi from 'joi'

export const age = Joi.number().integer().min(17).max(80).messages({
    'number.base': 'Age must be a number.',
    'number.min': 'Age must be at least 17.',
    'number.max': 'Age must be at most 80.',
})
export const badges = Joi.array()
    .items(Joi.string().valid('blue', 'black', 'green', 'orange').required())
    .messages({
        'array.base': 'Badges must be an array.',
        'array.empty': 'Badges must not be empty.',
        'any.valid': 'Badge must be one of [blue | black | green | orange].',
    })
export const favorites = Joi.object({
    artist: Joi.string().required().messages({
        'any.required': 'Artist required.',
    }),
    food: Joi.string().required().messages({
        'any.required': 'Food required.',
    }),
})
export const finished = Joi.array().items(
    Joi.number().required().messages({
        'any.required': 'Finished required.',
    })
)
export const name = Joi.string().min(1).max(30).messages({
    'string.min': 'Name must be at least 1 characters long.',
    'string.max': 'Name must be less than 30 characters long.',
    'any.required': 'Name is required.',
})
export const oldest = Joi.boolean()
export const phone = Joi.object({
    personal: Joi.string().min(10).max(10).required().messages({
        'string.min':
            'Personal phone number must be at least 10 characters long.',
        'string.max':
            'Personal phone number must be less than 10 characters long.',
        'any.required': 'Personal phone number is required.',
    }),
    work: Joi.string().min(10).max(10).required().messages({
        'string.min': 'work phone number must be at least 10 characters long.',
        'string.max': 'work phone number must be less than 10 characters long.',
        'any.required': 'work phone number is required.',
    }),
    ext: Joi.string().min(4).max(4).required().messages({
        'string.min': 'Extension number must be at least 4 characters long.',
        'string.max': 'Extension number must be less than 4 characters long.',
        'any.required': 'Extension number is required.',
    }),
})
export const points = Joi.object({
    points: Joi.number().min(0).max(100).required().messages({
        'number.min': 'Points must be at least 0.',
        'number.max': 'Points must be less than 100.',
        'any.required': 'Points is required.',
    }),
    bonus: Joi.number().min(0).max(50).required().messages({
        'number.min': 'Bonus must be at least 0.',
        'number.max': 'Bonus must be less than 50.',
        'any.required': 'Bonus is required.',
    }),
})
export const privileges = Joi.string().valid('admin', 'user').messages({
    'string.base': 'Privileges must be a string.',
    'string.valid': 'Privileges must be admin or user.',
})
