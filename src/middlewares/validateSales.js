const { salesSchema } = require('../controllers/validations/schemas');
const { productsService } = require('../services');

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
    const promises = sales.map(async ({ productId, quantity }) => { 
      const error = await salesSchema.validate({ productId, quantity })
        .catch((err) => err);
        
      if (error.errors) { throw error; }
      await validateProductId(productId);
    });
    await Promise.all(promises);
  } catch ({ errors }) {
    const { httpStatus, message } = errors[0];
    return res.status(httpStatus).json({ message });
  }
  next();
};

module.exports = {
  validateSales,
};
