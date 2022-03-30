import nodemailer from 'nodemailer';
import EmailTemplate from 'email-templates';

import { config } from '../config/config';
import { EmailActionEnum, emailInfo } from '../constants';
import path from 'path';

class EmailService {
    public async sendMail(userMail: string, action: EmailActionEnum): Promise<void> {
        const { subject, templateName } = emailInfo[action];

        const templateRenderer = new EmailTemplate({
            views: {
                root: path.join(process.cwd(), 'email-templates'),
            },
        });

        const html = await templateRenderer.render(templateName);

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
