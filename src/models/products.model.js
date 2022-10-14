const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
      'SELECT * FROM products',
  );
  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?', [productId],
  );
  return result;
};

const insert = async (newProductName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)', [newProductName],
  );
  return insertId;
};

const update = async (productId, name) => {
  const result = await connection.execute(
    `UPDATE products
    SET name = (?)
    WHERE id = (?)`, [name, productId],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};
