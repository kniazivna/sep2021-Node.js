import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req:Request, res:Response) => {
    // запит по певних параметрах
    // const users = await getManager().getRepository(User).findOne({
    //     where: {
    //         firstName: 'test',
    //     },
    // });
    // console.log(users);
    // res.json(users);
    // const users = await getManager().getRepository(User).find();
    // console.log(users);
    // res.json(users);
    // варіант через queryBuilder
    const users = await getManager().getRepository(User)
        .createQueryBuilder('user')
        // в дужках where прописується sql код
        .where('user.lastName = "gh"')
        .getMany();
    console.log(users);
    res.json(users);
});

app.post('/users', async (req, res) => {
    try {
        const createdUser = await getManager().getRepository(User).save(req.body);
        res.status(201).json(createdUser);
    } catch (e) {
        console.log(e);
    }
});

// оновлення даних
app.put('/users/:id', async (req, res) => {
    try {
        const { password, email } = req.body;
        const updatedUser = await getManager().getRepository(User)
            .update({ id: Number(req.params.id) }, {
                password,
                email,
            });
        res.status(201).json(updatedUser);
    } catch (e) {
        console.log(e);
    }
});

app.delete

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
