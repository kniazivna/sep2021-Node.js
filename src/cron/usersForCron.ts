import cron from 'node-cron';
import { userRepository } from '../repositiries/user/userRepository';
import { IUser } from '../entity';
import { emailService } from '../services';
import { EmailActionEnum } from '../constants';

export const usersForCron = async () => {
cron.schedule('30 10 * 8 *', async () => {
    console.log('start work with usersForCron');
    const usersForCron = await userRepository.getUsers();

    console.log(usersForCron);

    const mailByCron = usersForCron.map(
        async (user: IUser ) =>{
            const sendByCron = await emailService.sendMail(user.email, EmailActionEnum.CRON, {
                userName: user.firstName,
            });
            return sendByCron;
        }
    )
    await Promise.all(mailByCron);
});
}
