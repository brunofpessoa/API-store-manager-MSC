const express = require('express');
const { salesController } = require('../controllers');
const { validateSales } = require('../middlewares/validateSales');

const router = express.Router();

router.post('/', validateSales, salesController.registerSales);
router.get('/', salesController.listSales);
router.get('/:id', salesController.listSaleById);
router.delete('/:id', salesController.deleteSale);
router.put('/:id', validateSales, salesController.update);

module.exports = router;