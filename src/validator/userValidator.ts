import Joi from 'joi';

const userSchema = Joi.object().keys({
    firstName: Joi.string().alphanum().required(),
});
export { userSchema };
