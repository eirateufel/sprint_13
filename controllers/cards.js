const Card = require('../models/card');

module.exports.getCards = (req, res) => {
	Card.find({})
		.then((cards) => res.send({ data: cards }))
		.catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
	const { name, link } = req.body;
	const owner = req.user._id;
	Card.create({ name, link, owner })
		.then((card) => res.send({ data: card }))
		.catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.removeCard = (req, res) => {
	Card.findById(req.params.cardId)
		.then((card) => (JSON.stringify(card.owner) === JSON.stringify(req.user._id)))
		.then((result) => {
			if (result) {
				Card.findByIdAndRemove(req.params.cardId)
				// не уверена насчет правильности вложенности промисов, но это компактней,
				// чем заводить отдельную переменную под result и потом работать с ней
					.then((user) => res.send({ data: user }))
					.catch((err) => res.status(500).send({ message: err.message }));
			} else {
				res.status(403).send({ message: 'Недостаточно прав' });
			}
		})
		.catch((err) => {
			if (err.name === 'CastError') {
				res.status(404).send({ message: `Карточка ${err.value} не найдена` });
			} else { res.status(500).send({ message: err.message }); }
		});
};
