import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome to Sep2021-Node',
        html: 'welcome',
    },
    [emailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Your account was blocked',
        html: 'accountBlocked',
    },
    [emailActionEnum.REGISTRATION]: {
        subject: 'You create a new account',
        html: 'registration!',
    },
    [emailActionEnum.WRONG_PASSWORD]: {
        subject: 'WRONG PASSWORD!',
        html: 'forgotPassword',
    },
    [emailActionEnum.LOGOUT]: {
        subject: 'BYE-BYE',
        html: 'logout',
    }
};
