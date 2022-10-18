const express = require('express');
const { salesController } = require('../controllers');
const { validateSales } = require('../middlewares/validateSales');

const router = express.Router();

router.get('/', salesController.listSales);
router.get('/:id', salesController.listSaleById);
router.post('/', validateSales, salesController.registerSales);
router.put('/:id', validateSales, salesController.update);
router.delete('/:id', salesController.deleteSale);

module.exports = router;