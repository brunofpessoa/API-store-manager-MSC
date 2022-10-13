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

module.exports = {
  registerSales,
};
