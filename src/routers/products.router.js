const express = require('express');

const { productsController } = require('../controllers');
const { validateProductName } = require('../middlewares/validateProductName');

const router = express.Router();

router.get('/search', productsController.searchByQuery);
router.get('/', productsController.listProducts);
router.get('/:id', productsController.listProductById);
router.post('/', validateProductName, productsController.registerProduct);
router.put('/:id', validateProductName, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
