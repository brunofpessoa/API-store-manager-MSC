const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const registerSales = async (req, res) => {
  const sales = req.body;

  const { type, message } = await salesService.registerSales(sales);

  if (type) return res.status(errorMap[type]).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  registerSales,
};