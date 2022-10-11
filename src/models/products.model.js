const connection = require('./connection');

const findAll = async () => {
  try {
    const [result] = await connection.execute(
        'SELECT * FROM products',
    );
    return result;
  } catch (_err) {
    return undefined;
  }
};

const findById = async (productId) => {
  try {
    const [[result]] = await connection.execute(
      'SELECT * FROM products WHERE id = ?', [productId],
    );
    return result;
  } catch (_err) {
    return undefined;
  }
};

module.exports = {
  findAll,
  findById,
};
