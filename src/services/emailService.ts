import nodemailer, { SentMessageInfo } from 'nodemailer';
import EmailTemplate from 'email-templates';
import path from 'path';

import { config } from '../config/config';
import { EmailActionEnum, emailInfo } from '../constants';

class EmailService {
    public async sendMail(userMail: string, action: EmailActionEnum, context = {}): Promise<SentMessageInfo> {
        const templateRenderer = new EmailTemplate({
            views: {
                // @ts-ignore
                root: path.join(global.rootDir, 'email-templates'),
            },
        });

        const rootDir = path.join(__dirname, '../');
        const { subject, templateName } = emailInfo[action];
         console.log(__dirname);
        // @ts-ignore
        console.log(global.rootDir, 'rooooot');//так задаємо кореневу папку
        console.log(rootDir, 'THIS rooooot2222222');
        console.log(process.cwd());
        Object.assign(context, { frontendUrl: process.env.FRONTEND_URL });

        const html = await templateRenderer.render(templateName, context);

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
