import nodemailer from 'nodemailer';

import { config } from '../config/config';
import { emailActionEnum } from "../constants/enums";

class EmailService {
    sendMail(userEmail = '', action: emailActionEnum) {
        const emailTransporter = nodemailer.createTransport({
            from: 'No Reply Sep2021-Node',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
        });

        return emailTransporter.sendMail({
            to: userEmail,
            subject: 'HELLO WORLD!',
            html: 'HELLO THIS IS US MAIL',
        });
    }
}

export const emailService = new EmailService();
