const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.getAllProducts();
  if (type) return res.status(errorMap[type]).json({ message });
  res.status(200).json(message);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductById(id);
  if (type) return res.status(errorMap[type]).json({ message });
  res.status(200).json(message);
};

const registerProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productsService.addNewProduct(name);
  if (type) return res.status(errorMap[type]).json({ message });
  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productsService.updateProduct(id, name);

  if (type) return res.status(errorMap[type]).json({ message });

  res.status(200).json({ id, name });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.deleteProduct(id);

  if (type) return res.status(errorMap[type]).json({ message });

  res.status(204).end();
};

const searchByQuery = async (req, res) => {
  const { q } = req.query;

  const { message } = await productsService.searchByQuery(q);

  return res.status(200).json(message);
};

module.exports = {
  listProducts,
  listProductById,
  registerProduct,
  updateProduct,
  deleteProduct,
  searchByQuery,
};
