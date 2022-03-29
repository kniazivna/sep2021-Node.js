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
    [EmailActionEnum.REGISTRATION]: {
        subject: 'You create a new account',
        html: 'Congratulations in our family!',
    },
    [EmailActionEnum.WRONG_PASSWORD]: {
        subject: 'WRONG PASSWORD!',
        html: 'Be careful, if you enter wrong password one more time, your account will be blocked!',
    },
};
