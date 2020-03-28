const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const path = require('path');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', cardsRouter);
app.use('/', usersRouter);

app.listen(PORT, () => {
  // console.log('Im running');
});
