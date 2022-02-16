//Завдання на практику
//================================================================================================================

// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу, дані які ви отримали
// запишіть їх в інший файл, в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так
//

const path = require('path');
const fs = require('fs');

// fs.mkdir(path.join(__dirname, 'files'),//я правильно розумію, спочатку треба створити папку, а тоді файл, зразу папку з файлом створити не можна?
//     (err) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         fs.writeFile(path.join(__dirname, 'files', 'file.txt'),
//             'lesson-1-classwork-1-node.js',
//             (err) => {
//                 if (err) {
//                     console.log(err);
//                     throw err;
//                 }
//                 fs.readFile(path.join(__dirname, 'files', 'file.txt'),
//                     (err, fileData) => {
//                         if (err) {
//                             console.log(err);
//                             throw err;
//                         }
//                         fs.writeFile(path.join(__dirname, 'files', 'file2.txt'),
//                             fileData,
//                             (err) => {
//                                 if (err) {
//                                     console.log(err);
//                                     throw err;
//                                 }
//                                 //не знаю чи потрібно так робити, але так як в завданні запишіть дані, а не скопіюйте, то зрозуміла,що попередній файл треба очистити
//                                 fs.truncate(path.join(__dirname, 'files', 'file.txt'),
//                                     (err) => {
//                                         if (err) {
//                                             console.log(err);
//                                             throw err;
//                                         }
//                                     })
//                             })
//                     })
//             })
//     })

//=============ЩЕ ВИРІШИЛА ВАРІАНТ БЕЗ ПАПКИ ЗРОБИТИ==================================================================

// fs.writeFile(path.join(__dirname, 'file3.txt'),
//     'START LEARNING NODE.JS',
//     (err) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         fs.readFile(path.join(__dirname, 'file3.txt'),
//             (err, file3Data) => {
//                 if (err) {
//                     console.log(err);
//                     throw err;
//                 }
//                 fs.writeFile(path.join(__dirname, 'file4.txt'),
//                     file3Data,
//                     (err) => {
//                         if (err) {
//                             console.log(err);
//                             throw err;
//                         }
//                         fs.truncate(path.join(__dirname, 'file3.txt'),
//                             (err) => {
//                                 if (err) {
//                                     console.log(err);
//                                     throw err;
//                                 }
//                             })
//                     })
//             })
//     })

//====================================================================================================================

// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,
// старий файл видаліть після того як все завершиться. Також вийде callback hell

// fs.writeFile(path.join(__dirname, 'CWTask2.txt'), 'September2021',
//     (err) => {
//         if (err) {
//             console.log(err);
//             // a що краще використовувати 'throw err' чи 'return err'?
//             throw err;
//         }
//         fs.readFile(path.join(__dirname, 'CWTask2.txt'),
//             (err, CWTask2Data) => {
//                 if (err) {
//                     console.log(err);
//                     throw err;
//                 }
//                 fs.mkdir(path.join(__dirname, 'filesCWTask2'),
//                     (err) => {
//                         if (err) {
//                             console.log(err);
//                             throw err;
//                         }
//                         fs.writeFile(path.join(__dirname, 'filesCWTask2', 'CWTask2Copy.txt'),
//                             CWTask2Data,
//                             (err) => {
//                                 if (err) {
//                                     console.log(err);
//                                     throw err;
//                                 }
//                                 fs.unlink(path.join(__dirname, 'CWTask2.txt'), (err) => {
//                                     if (err) {
//                                         console.log(err);
//                                         throw err;
//                                     }
//                                 })
//                             })
//                     }
//                 )
//             })
//     })

//=====================================================================================================================

// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані
// (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать - це файли
// тоді вам потрібно їх очистити, але не видаляти, якщо дані - це папки, вам потрібно їх перейменувати і
// додати до назви префікс _new

fs.mkdir(path.join(__dirname, 'Task3Folder', 'files1'),
    {recursive: true},
    (err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    fs.writeFile(path.join(__dirname, 'Task3Folder', 'file2.txt'),
        'SOME TEXT INFORMATION',
        (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        fs.mkdir(path.join(__dirname, 'Task3Folder', 'files3'),
            {recursive: true},
            (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
            fs.writeFile(path.join(__dirname, 'Task3Folder', 'file4.txt'),
                '!!! SOME TEXT INFORMATION 2!!!',
                (err) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                fs.mkdir(path.join(__dirname, 'Task3Folder', 'files5'),
                    {recursive: true},
                    (err) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    fs.readdir(path.join(__dirname, 'Task3Folder'),
                        (err, Task3FolderData) => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                        for (let item of Task3FolderData) {
                            fs.stat(path.join(__dirname, 'Task3Folder', `${item}`),
                                (err, stat) => {
                                if (err) {
                                    console.log(err);
                                    throw err;
                                }
                                if (stat.isFile() === true) {
                                    fs.truncate(path.join(__dirname, 'Task3Folder', `${item}`),
                                        (err) => {
                                        if (err) {
                                            console.log(err);
                                            throw err;
                                        }
                                    })
                                } else if (stat.isDirectory() === true) {
                                    fs.rename(path.join(__dirname, 'Task3Folder', `${item}`),
                                        path.join(__dirname, 'Task3Folder', `_new${item}`),
                                        (err) => {
                                            if (err) {
                                                console.log(err);
                                                throw err;
                                            }
                                        })
                                } else {
                                    console.log("IT'S ANOTHER TYPE OF STATE");
                                }

                            })
                        }
                    })

                })
            })
        })
    })
})