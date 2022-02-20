const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');

const apiRouters = require('./routes/apiRouters');
let users = require('./db/users');


const app = express();

//default setup
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

//engine setup
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

//routes setup
app.use(apiRouters);

//тут я до кінця не зрозуміла, як в роути винести видалення юзера, і окремий роут робила, і до users додавала, ніякий з
// варіантів не працював, можливо підкажеш як правильно реалізувати?
//саме цікаве, що і тут чомусь вже не спрацьовує(
app.get('/deleteUserById/:id', (req, res) => {
const {params} = req;
    users = users.filter(user => user.id !== +params.id);
    res.redirect('/users');
});

app.listen(4000, () => {

    console.log('SERVER HAS STARTED!!!');
});