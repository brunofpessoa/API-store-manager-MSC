const express = require('express');

const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/:id', productsController.listProductById);

module.exports = router;
