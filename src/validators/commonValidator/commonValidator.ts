import Joi from 'joi';

import { constants } from '../../constants';

export const commonValidator = {
    emailValidator: Joi.string().regex(constants.EMAIL_REGEXP),
    phoneValidator: Joi.string().regex(constants.PHONE_REGEXP),
};
