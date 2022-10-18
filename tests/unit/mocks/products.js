const allProductsMock = [
  {
    id: 1,
    name: 'Martelo de Thor'
  },
  {
    id: 2,
    name: 'Traje de encolhimento'
  }
];

const productByIdMock = {
  id: 1,
  name: 'Martelo de Thor'
};

const insertedProductMock = {
  id: 9999,
  name: 'product x',
}

const updateResultMock = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1
  },
  undefined
];

const deleteResultMock = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
];

module.exports = {
  allProductsMock,
  productByIdMock,
  insertedProductMock,
  updateResultMock,
  deleteResultMock,
};
