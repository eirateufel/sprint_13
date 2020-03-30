const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();
const path = require('path');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

mongoose.connect('mongodb://localhost:27017/mestodb', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

app.use((req, res, next) => {
	req.user = {
		_id: '5e80f03e42ed865048e4e58a', // вставьте сюда _id созданного в предыдущем пункте пользователя
	};

	next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/', cardsRouter);
app.use('/', usersRouter);

app.listen(PORT, () => {
	// console.log('Im running');
});
