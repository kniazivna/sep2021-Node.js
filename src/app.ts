import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';

const app = express();

// app.get('/users', async (req, res) => {
//     const users = await getConnectionManager().getRepository(User)
//     res.end();
// });

app.listen(4000, async () => {
    console.log('SERVER HAS STARTED!!!!');
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
