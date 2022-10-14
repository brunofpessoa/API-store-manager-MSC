const { productsSchema } = require('../controllers/validations/schemas');

const validateProductName = async (req, res, next) => { 
  const { name } = req.body;
  const { errors } = await productsSchema.validate({ name }).catch((err) => err);

  if (errors) {
    const { httpStatus, message } = errors[0];
    return res.status(httpStatus).json({ message });
  }

  next();
};

module.exports = {
  validateProductName,
};