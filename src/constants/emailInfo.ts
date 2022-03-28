import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome to Sep2021-Node',
        html: 'This is welcome mail',
    },
    [emailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Your account was blocked',
        html: 'Ooops...account was blocked',
    },
};
