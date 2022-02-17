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

app.get('/users', ({query}, res) => {
    if (query) {
        let filteredUsers = [...users];
        if (query.age) {
            filteredUsers = filteredUsers.filter(user =>
                user.age === query.age);
        }
        if (query.city) {
            filteredUsers = filteredUsers.filter(user =>
                user.city === query.city);
        }
        res.render('users', {users: filteredUsers});
        return;
    }
    res.render('users', {users});
});

app.get('/errorPage', (req, res) => {
    res.render('errorPage', {error});
});

app.get('/signIn', (req, res) => {
    res.render('signIn');
});


app.get('/users/:id', ({params}, res) => {
    const userWithId = users.find(user => user.id === +params.id);
    if (!userWithId) {
        error = `USER WHITH THIS ID: ${params.id} WAS NOT FOUND`;
        res.redirect('/errorPage');
        return;
    }
    res.render('userById', {userWithId});
});

app.post('/login', (req, res) => {
    const {body}=req;
    const newUser = users.find(user => user.email === body.email);
    if (newUser) {
        error = 'THIS EMAIL HAS USED, TRY WITH ANOTHER EMAIL';
        res.redirect('/errorPage');
        return;
    }
    users.push({...body, id: users.length + 1})
    console.log(body);
    res.redirect('/users');
});

app.post('/signIn', ({body}, res) => {
    const signInUser = users.find(user => user.email === body.email && user.password === body.password);
    if(!signInUser){
        error = 'CHECK YOUR EMAIL AND PASSWORD OR TRY TO LOGIN';
        res.redirect('/errorPage');
        return
    }
        console.log(signInUser);
    res.redirect(`/users/${signInUser.id:userWithId.id}`);
})

app.use((req, res) => {
    res.render('notFound');
});
app.listen(4000, () => {
    console.log('SERVER HAS STARTED!!!');
});
