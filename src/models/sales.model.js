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

module.exports = {
  insert,
};
