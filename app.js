const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');

const users = [];

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));


app.listen(4000, () => {
    console.log('SERVER HAS STARTED!!!');


app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/users', (req, res) => {
    res.render('users', {users});
});

app.get('/errorPage', (req, res) => {
    res.render('errorPage');
});

for(const id = 1; id <= users.length; id++){
app.post('/login', (req, res) => {
    users.forEach(user => {
        if(user.email === req.body.email){
            res.redirect('/errorPage');
        } else{
            users.push({...req.body, id: `${id}`});
            res.redirect('/users');
        }
    });
});
}

app.get('/users', (req, res) => {
    res.render('users', {users});
});

app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    console.log(req.query);
    res.json(users[id]);
});






// app.use((req, res) => {
//     res.render('notFound');
// });
