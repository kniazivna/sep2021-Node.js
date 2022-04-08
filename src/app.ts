/* // @ts-ignore
global.rootDir = __dirname; */

import { createConnection } from 'typeorm';
import express from 'express';
import fileUpload from 'express-fileupload';
import http from 'http';
import 'reflect-metadata';
import SocketIO from 'socket.io';

import { apiRouter } from './router';
import { config } from './config/config';
import { socketController } from './controller/socketController';
//import { cronRun } from './cron';

const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = SocketIO(server, { cors: { origin: '*' } });

io.on('connection', (socket: any) => {
    console.log(socket.handshake.query.userId);
    console.log(socket.handshake.query.accessToken);

    //подія яка прийшла з фронта
    socket.on('message:create', (data: any) => socketController.messageCreate(io, socket, data));
    //КОЖЕН SOCKET.ON можна розділити по окремих контролерах

        //тут обробник на подію message:create з фронта(тут просто index.html)
        //можна зробити через контролер socketController.createMessage
        //console.log(data);
        //повертаємо response на подію, імітуємо нову подію яка йде на обробник у фронт
        //one-to-one message
       // socket.emit('message: get-all', { messages: [{ text: data.message }] });

        //send to all online users
        //io.emit('message: get-all', { messages: [{ text: data.message }] });


    socket.on('join_room', (data: any) => {
        socket.join(data.id);
        //шлеться всім, крім того хто цю подію тригернув
        //one to many avoid sender
        //socket.broadcast.to(data.id).emit('user_join_room', { message: `User ${socket.id} joined room ${data.id}` });
        //emit to all users in room, includes sender
        io.to(data.id).emit('user_join_room', { message: `User ${socket.id} joined room ${data.id}` });
    });

        // ONE TO ONE
        // socket.emit(event, {});

        // SEND TO ALL ONLINE USERS (INCLUDE SENDER)
        // io.emit(event, {})

        // SEND TO ALL ONLINE USERS (AVOID SENDER)
        // socket.broadcast.emit(event, {})

        // socket.join(room_id)

        // TO ROOM AVOID SENDER
        // socket.broadcast.to(room_id).emit(event, {})

        // TO ROOM INCLUDE SENDER
        // io.to(room_id).emit(event, {})
    });


app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const { PORT } = config;

server.listen(PORT, async () => {
    console.log(`SERVER HAS STARTED ON PORT: ${PORT}!!!!`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
          // await cronRun();
        }
    } catch (err) {
        if (err) console.log(err);
    }
})
