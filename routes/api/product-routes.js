// Imports express router and models
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET route for `/api/product`
router.get('/', async (req, res) => {
  try {
    // Finds all the products and the associated categories and tags
    const productData = await Product.findAll({
    include: [
      { model: Category }, 
      { model: Tag }
    ],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route for `/api/product/:id` that looks for a specific id
router.get('/:id', async (req, res) => {
  try {    
    // Find one product by its id value and includes associated categories and tags
    const productData = await Product.findByPk(req.params.id, {
      include: [
        { model: Category }, 
        { model: Tag }],
      });
    res.status(200).json(productData)
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST route for `/api/product/`
router.post('/', (req, res) => {
    // Creates a new product
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    tagIds: req.body.tag_id,
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        // Gets list of current tagIds
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        // Creates array of all product tags for the product
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


// PUT route for `/api/product/id`
router.put('/:id', (req, res) => {
    // Updates a product by searching with its id
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // Finds all associated tags from ProductTag
      
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      if (req.body.tagIds && req.body.tagIds.length) {
      // Gets list of current tag_ids
        const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // Creates a filtered list of new tag_ids
        const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });
        // Figures out which ones to remove
        const productTagsToRemove = productTags
         .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
         .map(({ id }) => id);

        // Runs both actions
        return Promise.all([
          ProductTag.destroy({ where: { id: productTagsToRemove } }),
          ProductTag.bulkCreate(newProductTags),
        ]);
      }
      res.status(200).json(productTags);
    })
    .then((updatedProductTags) => res.status(200).json(updatedProductTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});


// DELETE route for `/api/product/id` using an id
router.delete('/:id', async (req, res) => {
    // Deletes a product by searching for the id
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    // Checks to see if tag data exists and if not then replies with the message
    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
