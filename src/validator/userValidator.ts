import Joi from 'joi';

export const userSchema = {
    registration: Joi.object().keys({
        firstName: Joi.string().alphanum().min(3).max(30)
            .lowercase()
            .trim()
            .required(),
        lastName: Joi.string().alphanum().min(3).max(30)
            .lowercase()
            .trim()
            .required(),
        age: Joi.number().min(1).max(99).required(),
        phone: Joi.string().pattern(/^[0-9\-\+]{9,15}$/).trim().required(),
        email: Joi.string().pattern(/^([a-z0-9_-]+)(@[a-z0-9-]+)(\.[a-z]+|\.[a-z]+\.[a-z]+)?$/)
            .lowercase().trim()
            .required(),
        password: Joi.string().min(8).max(50).trim()
            .required(),
    }),

    login: Joi.object().keys({

    })
};
