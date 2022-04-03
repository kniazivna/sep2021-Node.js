import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome to Sep2021-Node',
        templateName: 'welcome',
    },
    [emailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Your account was blocked',
        templateName: 'accountBlocked',
    },
    [emailActionEnum.REGISTRATION]: {
        subject: 'You create a new account',
        templateName: 'registration',
    },
    [emailActionEnum.WRONG_PASSWORD]: {
        subject: 'WRONG PASSWORD!',
        templateName: 'forgotPassword',
    },
    [emailActionEnum.LOGOUT]: {
        subject: 'BYE-BYE',
        templateName: 'logout',
    },
};
