const express = require('express');
const {
  getCategories,
  addCategory,
  getDetailCategory,
  updateCategory,
  removeCategory,
  showProductsInCategory,
} = require('../controllers/categories.controller');

const router = express.Router();

router.get('/category', getCategories);
router.post('/category', addCategory);
router.get('/category/:id', getDetailCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', removeCategory);
router.get('/category/show-products/:slug', showProductsInCategory);

module.exports = router;