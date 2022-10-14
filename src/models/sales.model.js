const camelize = require('camelize');
const connection = require('./connection');

const insert = async (sales) => {
  const [{ insertId: saleId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (current_timestamp())',
  );

  const promises = sales.map(async (sale) => { 
    const values = [saleId, sale.productId, sale.quantity];
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', values,
    );
  });

  await Promise.all(promises);

  return saleId;
};

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    ORDER BY sp.sale_id, sp.product_id;`,
  );
  return camelize(result);
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT date, product_id, quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    WHERE s.id = (?)
    ORDER BY sp.sale_id, sp.product_id;`, [id],
  );
  return camelize(result);
};

module.exports = {
  insert,
  findAll,
  findById,
};
