import express from 'express';
import { users } from './users';

console.log(users);

const app = express();

app.listen(5500, () => {
    console.log('SERVER HAS STARTED!!!!');
});
