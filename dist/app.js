"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const post_1 = require("./entity/post");
const comment_1 = require("./entity/comment");
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
    const users = await (0, typeorm_1.getManager)().getRepository(user_1.User).find({ relations: ['posts'] });
    res.json(users);
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
    // const users = await getManager()
    //     .getRepository(User)
    //     .createQueryBuilder('user')
    //     .leftJoin('Posts', 'posts', 'posts.userId = user.id')
    // // .where('posts.text = "test88test88test"')
    //     .getMany();
    // res.json(users);
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
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await (0, typeorm_1.getManager)().getRepository(user_1.User)
        .createQueryBuilder('user')
        .where('user.id = :id', { id: Number(id) })
        .leftJoin('Posts', 'posts', 'posts.userId = user.id')
        .getOne();
    res.json(user);
});
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
app.post('/posts', async (req, res) => {
    try {
        const newPost = await (0, typeorm_1.getManager)()
            .getRepository(post_1.Post)
            .save(req.body);
        res.status(201).json(newPost);
    }
    catch (e) {
        console.log(e);
    }
});
app.get('/posts/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await (0, typeorm_1.getManager)()
            .getRepository(post_1.Post)
            .createQueryBuilder('post')
            .where('post.userId = :id', { id: Number(userId) })
            .leftJoin('User', 'user', 'user.id = post.userId')
            .getMany();
        res.json(user);
    }
    catch (e) {
        console.log(e);
    }
});
app.put('/posts/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, text } = req.body;
        const updatedPost = await (0, typeorm_1.getManager)()
            .getRepository(post_1.Post)
            .update({ id: Number(postId) }, {
            title,
            text,
        });
        res.json(updatedPost);
    }
    catch (e) {
        console.log(e);
    }
});
app.post('/comments', async (req, res) => {
    try {
        const newComment = await (0, typeorm_1.getManager)()
            .getRepository(comment_1.Comment)
            .save(req.body);
        res.status(201).json(newComment);
    }
    catch (e) {
        console.log(e);
    }
});
app.get('/comments/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const comments = await (0, typeorm_1.getManager)()
            .getRepository(comment_1.Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: Number(userId) })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
        res.json(comments);
    }
    catch (e) {
        console.log(e);
    }
});
app.post('/comments/action', async (req, res) => {
    try {
        const { action, commentId } = req.body;
        const addAction = (0, typeorm_1.getManager)()
            .getRepository(comment_1.Comment);
        const comment = await addAction.createQueryBuilder('comment')
            .where('comment.id = :id', { id: Number(commentId) })
            .getOne();
        if (!comment) {
            throw new Error('wrong comment ID');
        }
        if (action === 'like') {
            await addAction.update({ id: Number(commentId) }, { like: comment.like + 1 });
        }
        if (action === 'dislike') {
            await addAction.update({ id: Number(commentId) }, { dislike: comment.dislike + 1 });
        }
        res.sendStatus(201);
    }
    catch (e) {
        console.log(e);
    }
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