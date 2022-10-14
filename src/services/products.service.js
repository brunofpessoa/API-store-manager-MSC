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

const addNewProduct = async (name) => {
  const insertId = await productsModel.insert(name);
  if (!insertId) {
    return { type: 'INTERNAL_ERROR', message: 'Something went wrong' };
  }
  const product = await productsModel.findById(insertId);
  return { type: null, message: product };
};

const updateProduct = async (productId, name) => {
  const prevProduct = await productsModel.findById(productId);

  if (!prevProduct) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }

  const result = await productsModel.update(productId, name);

  if (result[0].changedRows !== 1) {
    return { type: 'INTERNAL_ERROR', message: 'Something went wrong' };
  }

  return { type: null, message: name };
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
};
