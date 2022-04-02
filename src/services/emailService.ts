import nodemailer from 'nodemailer';

import { config } from '../config/config';
import { emailActionEnum, emailInfo } from '../constants';

class EmailService {
    sendMail(userMail: string, action: emailActionEnum) {
        const { subject, html } = emailInfo[action];
        const emailTransporter = nodemailer.createTransport({
            from: 'No Reply Sep2021-Node',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
        });

        return emailTransporter.sendMail({
            to: userMail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
