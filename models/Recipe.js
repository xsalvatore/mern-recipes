const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  directions: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);
