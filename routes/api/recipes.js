const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const auth = require('../../middlewares/auth');

const Recipe = require('../../models/Recipe');

// adds a new recipe for the signed in user
router.post(
  '/',
  [
    auth,
    // need to have a test for the image but no validator for files with
    // express-validator ...
    check('category', 'please enter a category').not().isEmpty(),
    check('title', 'please enter a title for the recipe').not().isEmpty(),
    check('ingredients', 'please add some ingredients').not().isEmpty(),
    check('directions', 'please add some directions').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { image, category, title, ingredients, directions } = req.body;

    try {
      const recipe = new Recipe({
        image,
        category,
        title,
        ingredients,
        directions,
        user: req.user.id,
      });

      await recipe.save();

      res.json(recipe);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

// gets all recipes of signed in user
router.get('/', auth, async (req, res) => {
  try {
    const user = req.user.id;

    const recipes = await Recipe.find({
      user: user,
    }).sort({ date: -1 });

    if (!recipes) {
      return res.status(404).json({ errors: [{ msg: 'no recipes found' }] });
    }

    res.send(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

// gets a single recipe of signed in user
router.get('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ msg: 'no recipe found' });
    }

    res.json(recipe);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

// updates a single recipe of signed in user
router.post(
  '/edit/:id',
  [
    auth,
    // might just remove this validation ... not sure yet
    check('title', 'you need a title for the recipe').not().isEmpty(),
    check('category', 'you need a category for the recipe').not().isEmpty(),
    check('ingredients', 'you need to add some ingredients for the recipe')
      .not()
      .isEmpty(),
    check('directions', 'you need to add some directions for the recipe')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    try {
      const recipeId = req.params.id.toString();

      const body = req.body;

      const recipe = await Recipe.findByIdAndUpdate({ _id: recipeId }, body);

      res.send(recipe);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

// deletes a single recipe of signed in user
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: 'recipe not found' });
    }

    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'user not authorized' });
    }

    await recipe.remove();

    res.json({ msg: 'recipe removed' });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'recipe not found' });
    }

    res.status(500).send('server error');
  }
});

module.exports = router;
