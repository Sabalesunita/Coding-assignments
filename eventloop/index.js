const express = require('express');
const app = express();

app.get('/', (req, res) => {
 res.send("Hello World!");
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.listen(3000, () => {
 console.log(' listening on port 3000!')
});