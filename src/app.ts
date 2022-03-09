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
    // з'єднання з таблицею постів
    // const users = await getManager().getRepository(User).find({ relations: ['posts'] });
    // console.log(users);
    // res.json(users);
    //
    // варіанти через queryBuilder
    // const users = await getManager()
    //     .getRepository(User)
    //     .createQueryBuilder('user')
    //     // в дужках where прописується sql код
    //     // .where('user.lastName = "gh"')
    //     .getMany();
    // console.log(users);
    // res.json(users);
    const users = await getManager()
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoin('Posts', 'posts', 'posts.userId = user.id')
    // .where('posts.text = "test88test88test"')
        .getMany();
    res.json(users);
});

app.post('/users', async (req, res) => {
    try {
        const createdUser = await getManager()
            .getRepository(User)
            .save(req.body);
        res.status(201).json(createdUser);
    } catch (e) {
        console.log(e);
    }
});

// app.get('users/:id', async (req:Request, res:Response) => {
//     const { id } = req.params;
//     const user = await getManager()
//         .getRepository(User)
//         .createQueryBuilder('user')
//         .where('user.id = :id', { id: Number(id) })
//         .leftJoin('Posts', 'posts', 'posts.userId = user.id')
//         .getOne();
//     res.json(user);
//     console.log(user);
// });

// оновлення даних
app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const updatedUser = await getManager()
        .getRepository(User)
        .update({ id: Number(req.params.id) }, {
            password,
            email,
        });
    res.json(updatedUser);
});

app.delete('/users/:id', async (req, res) => {
    const deletedUser = await getManager()
        .getRepository(User)
        // повністю видаляє дані з бд
        // .delete({ id: Number(req.params.id) });
        // в бд дані залишаються, на фронт їх невидно(в deletesAt замість null буде час видалення)
        .softDelete({ id: Number(req.params.id) });
    res.json(deletedUser);
});

app.listen(4200, async () => {
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
