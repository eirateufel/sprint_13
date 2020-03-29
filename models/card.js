const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  likes: [{// сомнени по поводу этого пункта, но нет идей, как сделать правильней.
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'user'
  }]
});

module.exports = mongoose.model('card', cardSchema);
