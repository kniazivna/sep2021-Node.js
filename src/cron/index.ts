import { getNewUsers } from './getNewUsers';
import { usersForCron } from './usersForCron';

export const cronRun = async () => {
        console.log('cron was started');
        //await треба тільки тоді, коли є залежність однієї крони від іншої
        await getNewUsers();
        await usersForCron();
}
