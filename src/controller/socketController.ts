import { ISocket } from '../interfaces';

export const socketController = {
    messageCreateToAllAvoidSender: (io:any, socket: any, data: ISocket) => {
        // console.log(data);
        socket.broadcast.emit('message: get-all', { messages: [{ text: data.message }] });
    },
    joinRoom: (io: any, socket: any, data: ISocket) => {
        socket.join(data.id);
        io.to(data.id).emit('user_join_room', { message: `User ${socket.id} joined room ${data.id}` });
    },
}
