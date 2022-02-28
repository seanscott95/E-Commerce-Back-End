// Imports express router and models
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET route for `/api/tags`
router.get('/', async (req, res) => {
  try {
    // Finds all the tags and the associated products
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route for `/api/tags/:id` that looks for a specific id
router.get('/:id', async (req, res) => {
  try {
    // Find one tag by its id value and includes associated products
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product }],
      });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
});


// POST route for `/api/tags/`
router.post('/', async (req, res) => {
  try {
    // Creates a new tag
    const tagData = await Tag.create({
      id: req.params.id,
      tag_name: req.body.tag_name,
    })
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT route for `/api/tags/id`
router.put('/:id', async (req, res) => {
  try {
    // Updates a tag by searching with its id
    const newTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(newTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE route for `/api/tags/id` using an id
router.delete('/:id', async (req, res) => {
  try {    
    // Deletes a tag by searching for the id
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    // Checks to see if tag data exists and if not then replies with the message
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
