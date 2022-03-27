import Joi from 'joi';
//розібратись як ерори прописувати, додати ці схеми через юзер міделвари на реєстрацію і логін
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
        phone: Joi.string().pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[0-9]*$/).trim().required(),
        email: Joi.string().pattern(/^([a-z0-9_-]+)(@[a-z0-9-]+)(\.[a-z]+|\.[a-z]+\.[a-z]+)?$/)
            .lowercase().trim()
            .required(),
        password: Joi.string().min(8).max(50).trim()
            .required(),
    }),

    login: Joi.object().keys({
        email: Joi.string().pattern(/^([a-z0-9_-]+)(@[a-z0-9-]+)(\.[a-z]+|\.[a-z]+\.[a-z]+)?$/)
            .lowercase().trim()
            .required(),
        password: Joi.string().min(8).max(50).trim()
            .required(),
    }),
};
