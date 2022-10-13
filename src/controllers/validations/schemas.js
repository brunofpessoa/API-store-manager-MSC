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

module.exports = {
  productsSchema,
};