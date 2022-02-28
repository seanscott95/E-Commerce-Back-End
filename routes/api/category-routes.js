// Imports express router and models
const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET route for `/api/categories`
router.get('/', async (req, res) => {
  try { 
    // Finds all the categories and the associated products
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route for `/api/categories/:id` that looks for a specific id
router.get('/:id', async (req, res) => {
  try {
    // Find one category by its id value and includes associated products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        { model: Product}],
      });
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST route for `/api/categories/`
router.post('/', async (req, res) => {
  try {
    // Creates a new category
    const newCategoryData = await Category.create({
      id: req.params.id,
      category_name: req.body.category_name,
    })
    res.status(200).json(newCategoryData)
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT route for `/api/categories/id`
router.put('/:id', async (req, res) => {
  try {
    // Updates a category by searching with its id
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE route for `/api/categories/id` using an id
router.delete('/:id', async (req, res) => {
  try {
    // Deletes a category by searching for the id
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // Checks to see if category data exists and if not then replies with the message
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
