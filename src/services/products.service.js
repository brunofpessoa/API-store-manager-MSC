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

const deleteProduct = async (productId) => {
  const prevProduct = await productsModel.findById(productId);

  if (!prevProduct) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }

  const result = await productsModel.deleteProduct(productId);

  if (result[0].affectedRows !== 1) {
    return { type: 'INTERNAL_ERROR', message: 'Something went wrong' };
  }

  return { type: null, message: null };
};

const searchByQuery = async (query) => {
  const products = await productsModel.searchByQuery(query);

  if (products.length < 1) {
    const allProducts = await productsModel.findAll();
    return { type: null, message: allProducts };
  }

  return { type: null, message: products };
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
  searchByQuery,
};
