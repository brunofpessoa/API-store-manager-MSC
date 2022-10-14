const { salesModel } = require('../models');

const registerSales = async (sales) => {
  const saleId = await salesModel.insert(sales);
  if (!saleId) {
    return { type: 'INTERNAL_ERROR', message: 'Something went wrong' };
  }

  const insertedSales = {
    id: saleId,
    itemsSold: sales,
  };

  return { type: null, message: insertedSales };
};

const getAllSales = async () => {
  const result = await salesModel.findAll();
  if (result.length < 1) {
    return { type: 'INTERNAL_ERROR', message: 'Something went wrong' };
  }
  return { type: null, message: result };
};

const getSaleById = async (id) => {
  const result = await salesModel.findById(id);
  if (result.length < 1) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: result };
};

module.exports = {
  registerSales,
  getAllSales,
  getSaleById,
};
