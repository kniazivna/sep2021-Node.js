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
    // const users = await getManager().getRepository(User).find();
    // console.log(users);
    // res.json(users);
    // варіант через queryBuilder
    const users = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .createQueryBuilder('user')
        // в дужках where прописується sql код
        // .where('user.lastName = "gh"')
        .getMany();
    console.log(users);
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
// оновлення даних
app.patch('/users/:id', async (req, res) => {
    try {
        const { password, email } = req.body;
        const updatedUser = await (0, typeorm_1.getManager)()
            .getRepository(user_1.User)
            .update({ id: Number(req.params.id) }, {
            password,
            email,
        });
        res.status(201).json(updatedUser);
    }
    catch (e) {
        console.log(e);
    }
});
app.delete('/users/:id', async (req, res) => {
    const deletedUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .delete({ id: Number(req.params.id) });
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