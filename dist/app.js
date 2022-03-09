"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get('/users', async (req, res) => {
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
    const users = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .createQueryBuilder('user')
        .leftJoin('Posts', 'posts', 'posts.userId = user.id')
        // .where('posts.text = "test88test88test"')
        .getMany();
    res.json(users);
});
app.post('/users', async (req, res) => {
    try {
        const createdUser = await (0, typeorm_1.getManager)()
            .getRepository(user_1.User)
            .save(req.body);
        res.status(201).json(createdUser);
    }
    catch (e) {
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
    const updatedUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .update({ id: Number(req.params.id) }, {
        password,
        email,
    });
    res.json(updatedUser);
});
app.delete('/users/:id', async (req, res) => {
    const deletedUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        // повністю видаляє дані з бд
        // .delete({ id: Number(req.params.id) });
        // в бд дані залишаються, на фронт їх невидно(в deletesAt замість null буде час видалення)
        .softDelete({ id: Number(req.params.id) });
    res.json(deletedUser);
});
app.listen(4200, async () => {
    console.log('SERVER HAS STARTED!!!!');
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('Database connected');
        }
    }
    catch (err) {
        if (err)
            console.log(err);
    }
});
//# sourceMappingURL=app.js.map