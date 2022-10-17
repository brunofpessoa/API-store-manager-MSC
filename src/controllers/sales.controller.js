const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const registerSales = async (req, res) => {
  const sales = req.body;

  const { type, message } = await salesService.registerSales(sales);

  if (type) return res.status(errorMap[type]).json({ message });
  return res.status(201).json(message);
};

const listSales = async (_req, res) => {
  const { type, message } = await salesService.getAllSales();
  if (type) return res.status(errorMap[type]).json({ message });
  res.status(200).json(message);
};

const listSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);
  if (type) return res.status(errorMap[type]).json({ message });
  res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.deleteSale(id);

  if (type) return res.status(errorMap[type]).json({ message });

  res.status(204).end();
};

const update = async (req, res) => {
  const { id } = req.params;
  const newValues = req.body;

  const { type, message } = await salesService.update(id, newValues);

  if (type) return res.status(errorMap[type]).json({ message });

  const response = {
    saleId: id,
    itemsUpdated: message,
  };

  res.status(200).json(response);
};

module.exports = {
  registerSales,
  listSales,
  listSaleById,
  deleteSale,
  update,
};