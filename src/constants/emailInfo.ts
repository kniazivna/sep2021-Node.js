import { EmailActionEnum } from './enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Welcome to Sep2021-Node',
        templateName: 'welcome',
    },
    [EmailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Your account was blocked',
        templateName: 'accountBlocked',
    },
    [EmailActionEnum.REGISTRATION]: {
        subject: 'You create a new account',
        templateName: 'registration!',
    },
    [EmailActionEnum.WRONG_PASSWORD]: {
        subject: 'WRONG PASSWORD!',
        templateName: 'forgotPassword',
    },
    [EmailActionEnum.LOGOUT]: {
        subject: 'BYE-BYE',
        templateName: 'logout',
    },
};
