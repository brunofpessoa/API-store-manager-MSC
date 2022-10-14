const { salesSchema } = require('../controllers/validations/schemas');
const { productsService, salesService } = require('../services');

function CustomError(httpStatus, message) {
  this.errors = [{ httpStatus, message }];
}
CustomError.prototype = Error.prototype;

const validateProductId = async (productId) => {
  const { type } = await productsService.getProductById(productId);
  if (type) {
    throw new CustomError(404, 'Product not found');
  }
};

const validateSales = async (req, res, next) => {
  const sales = req.body;
  try {
    const promises = sales.map(async (sale) => { 
      const { productId, quantity } = sale;
      const error = await salesSchema.validate({ productId, quantity })
        .catch((err) => err);
        
      if (error.errors) {
        throw error;
      }

      await validateProductId(productId);
    });

    await Promise.all(promises);
  } catch ({ errors }) {
    const { httpStatus, message } = errors[0];
    return res.status(httpStatus).json({ message });
  }

  return next();
};

const validateSaleId = async (saleId) => {
  const { type } = await salesService.getSaleById(saleId);
  if (type) {
    throw new CustomError(404, 'Sale not found');
  }
};

const validateListSale = async (req, res, next) => {
  const { id } = req.params;
  try {
    await validateSaleId(id);
  } catch ({ errors }) {
    const { httpStatus, message } = errors[0];
    return res.status(httpStatus).json({ message });
  }
  next();
};

module.exports = {
  validateSales,
  validateListSale,
};
