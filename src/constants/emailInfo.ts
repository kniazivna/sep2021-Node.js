import { EmailActionEnum } from './enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Welcome to Sep2021-Node',
        html: 'This is welcome mail',
    },
    [EmailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Your account was blocked',
        html: 'Ooops...account was blocked',
    },
};
