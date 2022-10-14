const express = require('express');
const { salesController } = require('../controllers');
const { validateSales, validateListSale } = require('../middlewares/validateSales');

const router = express.Router();

router.post('/', validateSales, salesController.registerSales);
router.get('/', salesController.listSales);
router.get('/:id', validateListSale, salesController.listSaleById);

module.exports = router;