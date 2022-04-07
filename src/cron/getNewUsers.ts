import cron from 'node-cron';
import { userRepository } from '../repositiries/user/userRepository';


export const getNewUsers = async () => {
cron.schedule('*/30 * * * * *', async () => {
    console.log('start work with getNewUsers');
    const newUsers = await userRepository.getNewUsers();

    console.log(newUsers);
});
}
