const express = require('express');
const {
    getProducts,
    addProduct,
    getDetailProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/products.controller');

const router = express.Router();

router.get('/product', getProducts);
router.post('/product', addProduct);
router.get('/product/:id', getDetailProduct);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

module.exports = router;