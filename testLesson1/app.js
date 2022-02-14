//  const {greeting, test} = require('./helper');
// greeting('Olena');
// test();

// console.log(__filename);
// console.log(__dirname);

// require('./helper');
// console.log(user);

// const path = require('path');
//
// const joinedPath = path.join('app', 'node','test', 'file.txt');
// console.log(joinedPath);
//
// const resolvedPath = path.resolve('//test\\\main//node/////test.txt');
// console.log(resolvedPath);


// const os = require('os');
// console.log(os.cpus());
// console.log(os.cpus().length);
// console.log(os.freemem());
// console.log(os.hostname());

const fs = require('fs');
const path = require('path');

// fs.writeFile(path.join(__dirname, 'files', 'file.txt'), 'test node fs!!!!!', (err) =>{
//     if(err){
//         console.log(err);
//         throw err;
//     }
// })



// fs.readFile(path.join(__dirname, 'files', 'file.txt'),'utf8', (err, data) =>{
// if(err) {
//     console.log(err);
//     throw err;
// }
//     console.log(data);
// })

// fs.mkdir(path.join(__dirname, 'files', 'newFile'),(err) => {
//     if(err){
//         console.log(err);
//         throw err;
//     }
// })

// fs.rmdir(path.join(__dirname,'files', 'newFile'), (err) => {
//     if(err){
//         console.log(err);
//         throw err;
//     }
// })

// fs.readdir(path.join(__dirname, 'files'), (err, data) =>{
//     console.log(data);
// })

// fs.unlink(path.join(__dirname, 'files', 'file.txt'), (err) => {
//     if(err){
//         console.log(err);
//         throw err;
//     }
// })

// fs.truncate(path.join(__dirname,'files', 'file.txt'),5,  (err) =>{
//     if(err){
//         console.log(err);
//         throw err;
//     }
// })

// fs.rename(path.join(__dirname, 'files', 'file.txt'), path.join(__dirname, 'files', 'newFile.txt'), (err) => {
//     console.log(err);
//     throw err;
// })

fs.rename(path.join(__dirname, 'files', 'newFile.txt'), path.join(__dirname, 'new', 'newFile.txt'), (err) => {
    if(err){
        console.log(err);
        throw err;
    }
})