const yup = require('yup');

const productsSchema = yup.object().shape({
  name: yup.string()
    .required(() => ({
      httpStatus: 400,
      message: '"name" is required',
    }))
    .min(5, () => ({
      httpStatus: 422,
      message: '"name" length must be at least 5 characters long',
    })),
});

const salesSchema = yup.object().shape({
  productId: yup
    .number()
    .required(() => ({
      httpStatus: 400,
      message: '"productId" is required',
    })),
  quantity: yup
    .number()
    .required(() => ({
      httpStatus: 400,
      message: '"quantity" is required',
    }))
    .min(1, () => ({
      httpStatus: 422,
      message: '"quantity" must be greater than or equal to 1',
    })),
});

module.exports = {
  productsSchema,
  salesSchema,
};