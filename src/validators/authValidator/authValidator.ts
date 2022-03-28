import Joi from 'joi';

import { commonValidator } from '../commonValidator/commonValidator';

export const authValidator = {
    registration: Joi.object({
        firstName: Joi.string().alphanum().required().min(3)
            .max(30)
            .lowercase()
            .message('Firstname is required')
            .trim(),
        lastName: Joi.string().alphanum().required().min(3)
            .max(30)
            .lowercase()
            .message('Lastname is required')
            .trim(),
        age: Joi.number().required().min(1).max(120)
            .message('Age not valid'),
        phone: commonValidator.phoneValidator.min(10).message('Phone not valid').trim().required(),
        email: commonValidator.emailValidator.message('Email not valid').trim(),
        password: Joi.string().required().min(8).message('Password not valid')
            .trim(),
    }),
    login: Joi.object({
        email: commonValidator.emailValidator.message('Email not valid').trim(),
        password: Joi.string().required().min(8).message('Password not valid')
            .trim(),
    }),
};
