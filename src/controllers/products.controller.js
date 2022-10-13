const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');
const { productsSchema } = require('./validations/schemas');

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
  const { errors } = await productsSchema.validate({ name }).catch((err) => err);

  if (errors) {
    const { httpStatus, message } = errors[0];
    return res.status(httpStatus).json({ message });
  }

  const { type, message } = await productsService.addNewProduct(name);
  if (type) return res.status(errorMap[type]).json({ message });
  res.status(201).json(message);
};

module.exports = {
  listProducts,
  listProductById,
  registerProduct,
};
