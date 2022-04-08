/* // @ts-ignore
global.rootDir = __dirname; */

import 'reflect-metadata';
import express from 'express';
import fileUpload from 'express-fileupload';
import { createConnection } from 'typeorm';

import { apiRouter } from './router';
import { config } from './config/config';
import { cronRun } from './cron';

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const { PORT } = config;

app.listen(PORT, async () => {
    console.log(`SERVER HAS STARTED ON PORT: ${PORT}!!!!`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
           await cronRun();
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
