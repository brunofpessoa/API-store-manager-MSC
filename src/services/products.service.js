const { productsModel } = require('../models');

const getAllProducts = async () => {
  const result = await productsModel.findAll();
  if (!result) {
    return { type: 'INTERNAL_ERROR', message: 'Something went wrong' };
  }
  return { type: null, message: result };
};

const getProductById = async (id) => {
  const result = await productsModel.findById(id);
  if (!result) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: result };
};

module.exports = {
  getAllProducts,
  getProductById,
};
