// ДЗ:
// Всі дії виконувати з допомогою модулів (вручну нічого не створюємо)
// Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson

// const path = require('path');
// const fs = require('fs');
//
// fs.mkdir(path.join(__dirname, 'main', 'online'), {recursive: true}, (err) =>{
//     if(err){
//         console.log(err);
//     } else{
//         fs.mkdir(path.join(__dirname, 'main', 'inPerson'), {recursive: true}, (err) =>{
//             if(err){
//                 console.log(err);
//                 throw err;
//             }
//         })
//     }
//
// });

//==================================================================================================================

// Потім створити в вашому головному файлі (для прикладу app.js) два масиви з
// обєктами user ({. name: "Andrii", age: 22, city: "Lviv" }),  відповідно перший - onlineUsers, другий - inPersonUsers;
// і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів,
// але щоб ваш файл виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.
//
// const onlineUsers =[
// {name: 'Petro', age: 30, city: 'Lviv'},
// {name: 'Olena', age: 33, city: 'Lviv'},
// {name: 'Oliya', age: 2, city: 'Lviv'},
// ];
// onlineUsers.forEach(user => {
//     for (let key in user) {
// fs.appendFile(path.join(__dirname, 'main','online', 'online.txt'),
//    `\n${key.toUpperCase()}: ${user[key]}`,
//     (err) => {
//         if(err){
//             console.log(err);
//             throw err;
//         }
//     })}});

// const inPersonUsers = [
//     {name: 'Oksana', age:31, city: 'Lviv'},
//     {name: 'Oksana', age:31, city: 'Lviv'},
//     {name: 'Marko', age:6, city: 'Lviv'},
//     {name: 'Sophiya', age:4, city: 'Lviv'}
// ];
// inPersonUsers.forEach(user => {
//     for(let key in user){
//         fs.appendFile(path.join(__dirname, 'main','inPerson', 'inPerson.txt'),
//    `\n${key.toUpperCase()}: ${user[key]}`,
//     (err) => {
//         if(err){
//             console.log(err);
//             throw err;
//         }
//     })}});


//==================================================================================================================
//Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу.
// (ті, що були в папці inPerson будуть в папці online)
//
// const onlinePath = path.join(__dirname, 'main', 'online', 'online.txt');
// const inPerson = path.join(__dirname, 'main', 'inPerson', 'inPerson.txt');
// fs.readFile(onlinePath, (err, data1) => {
//     if(err){
//         console.log(err);
//         throw err;
//     }
//
//     fs.readFile(inPerson, (err,data2) =>{
//         if(err){
//             console.log(err);
//             throw err;
//         }
//         fs.writeFile(onlinePath,
//             data2,
//             (err) => {
//             if(err){
//                 throw err;
//             }
//             fs.writeFile(inPerson,
//                 data1,
//                 (err) =>{
//                 if(err){
//                     console.log(err);
//                     throw err;
//                 }
//                 })
//             }
//         )
//
// })})

//=========АБО ЩЕ ТАКИЙ ВАРІАНТ, ВСЕ В ОДНІЙ CALLBACK ФУНКЦІЇ

//!!!ПРОКОМЕНТУЙ, БУДЬ ЛАСКА ЧИ В ЦЬОМУ ВАРІАНТІ ВСЕ ВІРНО, ВОНО ТО ПРАЦЮЄ, АЛЕ В МЕНЕ ЧОМУСЬ Є СУМНІВИ ЧИ ТОЧНО ВСЕ ТАК, ЯК МАЄ БУТИ

const path = require('path');
const fs = require('fs');

const onlinePath = path.join(__dirname, 'main', 'online', 'online.txt');
const inPersonPath = path.join(__dirname, 'main', 'inPerson', 'inPerson.txt');

const onlineUsers = [
    {name: 'Olena', age: 33, city: 'Lviv'},
    {name: 'Petro', age: 30, city: 'Lviv'},
    {name: 'Olia', age: 2, city: 'Lviv'}
];

const inPersonUsers = [
    {name: 'Oksana', age: 31, city: 'Lviv'},
    {name: 'Sergij', age: 31, city: 'Lviv'},
    {name: 'Marko', age: 6, city: 'Lviv'},
    {name: 'Sophia', age: 4, city: 'Lviv'}
];

fs.mkdir(path.join(__dirname, 'main', 'online'), {recursive: true}, (err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    fs.mkdir(path.join(__dirname, 'main', 'inPerson'), {recursive: true}, (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        onlineUsers.forEach(user => {
            for (key in user) {
                fs.appendFile(onlinePath,
                    `\n${key.toUpperCase()}:${user[key]}`,
                    (err) => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }

                    })
            }

        })
        inPersonUsers.forEach(user => {
            for (key in user) {
                fs.appendFile(inPersonPath,
                    `\n${key.toUpperCase()}:${user[key]}`,
                    (err) => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                    })
            }
        })
        fs.readFile(onlinePath, (err, onlineData) => {
            if (err) {
                console.log(err);
                throw err;
            }
            fs.readFile(inPersonPath, (err, inPersonData) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                fs.writeFile(onlinePath, inPersonData, (err) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    fs.writeFile(inPersonPath, onlineData, (err) => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                    })
                })
            })
        })
    })
})





