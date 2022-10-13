const express = require('express');
const { salesController } = require('../controllers');
const { validateSales } = require('../middlewares/validateSales');

const router = express.Router();

router.post('/', validateSales, salesController.registerSales);

module.exports = router;