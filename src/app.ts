import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.end();
});

app.listen(5500, () => {
    console.log('SERVER HAS STARTED!!!!');
});
