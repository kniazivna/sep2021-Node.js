// ДЗ:
// Всі дії виконувати з допомогою модулів (вручну нічого не створюємо)
// Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson

const path = require('path');
const fs = require('fs');

// fs.mkdir(path.join(__dirname, 'main', 'online'), {recursive: true}, (err) =>{
//     if(err){
//         console.log(err);
//     } else{
//         fs.mkdir(path.join(__dirname, 'main', 'inPerson',), {recursive: true}, (err) =>{
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
const onlineUsers =[
{name: 'Petro', age: 30, city: 'Lviv'}
];
onlineUsers.map(user => global.user = user);

const inPersonUsers = [
    {name: 'Oksana', age:31, city: 'Lviv'}
];
inPersonUsers.map(user => global.inUser = user);

fs.writeFile(path.join(__dirname, 'main','online', 'online.txt'),
    `Name: ${user.name}\nAge:${user.age}\nCity:${user.city}`,
    (err) =>{
    if(err){
        console.log(err);
        throw err;
    }
})

fs.writeFile(path.join(__dirname, 'main','inPerson', 'inPerson.txt'),
    `Name:${inUser.name}\nAge:${inUser.age}\nCity:${inUser.city}`,
    (err) =>{
        if(err){
            console.log(err);
            throw err;
        }
    })

//==================================================================================================================
Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу. (ті, що були в папці inPerson будуть в папці online)



