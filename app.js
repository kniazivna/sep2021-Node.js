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

const users = [];
let error = '';

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/users', (req, res) => {
    if (req.query) {
        let filteredUsers = [...users];
        if (req.query.age) {
            filteredUsers = filteredUsers.filter(user =>
                user.age === req.query.age);
        }
        if (req.query.city) {
            filteredUsers = filteredUsers.filter(user =>
                user.city === req.query.city);
        }
        res.render('users', {users: filteredUsers});
        return;
    }
    res.render('users', {users});
});

app.get('/errorPage', (req, res) => {
    res.render('errorPage', {error});
});


app.get('/users/:id', (req, res) => {
    const userWithId = users.find(user => user.id === +req.params.id);
    if (!userWithId) {
        error = `USER WHITH THIS ID: ${req.params.id} WAS NOT FOUND`;
        res.redirect('/errorPage');
        return;
    }
    res.render('userById', {userWithId});
});

app.post('/login', (req, res) => {
    const newUser = users.some(user => user.email === req.body.email);
    if (newUser) {
        error = 'THIS EMAIL HAS USED, TRY WITH ANOTHER EMAIL';
        res.redirect('/errorPage');
        return;
        console.log(req.body);
        users.push({...req.body, id: users.length + 1})
        console.log(users);
        res.redirect('/users');
    }
});

app.use((req, res) => {
    res.render('notFound');
});
app.listen(4000, () => {
    console.log('SERVER HAS STARTED!!!');
});
