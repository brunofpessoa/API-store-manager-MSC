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

const deleteSale = async (id) => {
  const result = await connection.execute(
    `DELETE sales, sales_products
    FROM sales, sales_products
    WHERE sales.id = (?) AND sales_products.sale_id = (?);
    `, [id, id],
  );
  return result;
};

const update = async (id, previousValues, newValues) => {
  const { productId, quantity } = previousValues;
  const { productId: newProductId, quantity: newQuantity } = newValues;

  const result = await connection.execute(
    `UPDATE StoreManager.sales_products
    SET product_id = (?), quantity = (?)
    WHERE sale_id = (?) AND product_id = (?) AND quantity = (?);`,
    [newProductId, newQuantity, id, productId, quantity],
  );
  return result;
};

module.exports = {
  insert,
  findAll,
  findById,
  deleteSale,
  update,
};
