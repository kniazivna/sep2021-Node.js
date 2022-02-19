const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

let users = [];
let error = '';

app.get('/login', (req, res) => {

    res.render('login');
});

app.post('/login', (req, res) => {

    const {body} = req;
    const newUser = users.find(user => user.email === body.email);

    if (newUser) {
        error = 'THIS EMAIL HAS USED, TRY WITH ANOTHER EMAIL';
        res.redirect('/errorPage');
        return;
    }

    users.push({...body, id: users.length + 1});
    res.redirect('/users');
});

app.get('/users', (req, res) => {

    const {query} = req;

    if (query) {
        let filteredUsers = [...users];

        if (query.age) {
            filteredUsers = filteredUsers.filter(user => user.age === query.age);
        }

        if (query.city) {
            filteredUsers = filteredUsers.filter(user => user.city === query.city);
        }

        res.render('users', {users: filteredUsers});
        return;
    }

    res.render('users', {users});
});

app.get('/users/:id', (req, res) => {

    const {params} = req;
    const userWithId = users.find(user => user.id === +params.id);

    if (!userWithId) {
        error = `USER WHITH THIS ID: ${params.id} WAS NOT FOUND`;
        res.redirect('/errorPage');
        return;
    }

    res.render('userById', {userWithId});
});

app.get('/signIn', (req, res) => {

    res.render('signIn');
});

app.post('/signIn', (req, res) => {

    const {body} = req;
    const signInUser = users.find(user => user.email === body.email && user.password === body.password);

    if (!signInUser) {
        error = 'CHECK YOUR EMAIL AND PASSWORD OR TRY TO LOGIN';
        res.redirect('/errorPage');
        return
    }

    res.redirect(`/users/${signInUser.id}`);
});

app.get('/deleteUserById/:id', (req, res) => {

    users = users.filter(user => user.id !== +req.params.id);
    res.redirect('/users');
});

app.get('/errorPage', (req, res) => {

    res.render('errorPage', {error});
});


app.use((req, res) => {

    res.render('notFound');
});
app.listen(4000, () => {

    console.log('SERVER HAS STARTED!!!');
});