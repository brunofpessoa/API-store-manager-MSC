const salesMock = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
];

const salesWithoutProductId = [
  {
    quantity: 5
  }
];

const salesWithoutQuantity = [
  {
      productId: 1
  }
];

const salesWrongQuantity = [
  {
    productId: 1,
    quantity: 0
  }
];

const saleswithWrongProductId = [
  {
    productId: 9999,
    quantity: 1
  }
];

const salesSuccessResposeMock = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1
    },
    {
      productId: 2,
      quantity: 5
    }
  ]
};

const allSalesMock = [
  {
    saleId: 1,
    date: '2022-10-14T15:41:59.000Z',
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: '2022-10-14T15:41:59.000Z',
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: '2022-10-14T15:41:59.000Z',
    productId: 3,
    quantity: 15
  }
];

const allSalesDbMock = [
  {
    sale_id: 1,
    date: '2022-10-14T15:41:59.000Z',
    product_id: 1,
    quantity: 5
  },
  {
    sale_id: 1,
    date: '2022-10-14T15:41:59.000Z',
    product_id: 2,
    quantity: 10
  },
  {
    sale_id: 2,
    date: '2022-10-14T15:41:59.000Z',
    product_id: 3,
    quantity: 15
  }
];

const saleByIdMock = [
  {
    date: '2022-10-14T15:41:59.000Z',
    productId: 1,
    quantity: 5
  },
  {
    date: '2022-10-14T15:41:59.000Z',
    productId: 2,
    quantity: 10
  },
];

const saleByIdDbMock = [
  {
    date: '2022-10-14T15:41:59.000Z',
    product_id: 1,
    quantity: 5
  },
  {
    date: '2022-10-14T15:41:59.000Z',
    product_id: 2,
    quantity: 10
  },
];

const deleteResultMock = [
  {
    fieldCount: 0,
    affectedRows: 2,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
];

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

const updatedSaleMock = [
  {
    productId: 1,
    quantity: 10
  },
  {
    productId: 2,
    quantity: 50
  }
];


module.exports = {
  salesMock,
  salesWithoutProductId,
  salesSuccessResposeMock,
  salesWithoutQuantity,
  salesWrongQuantity,
  saleswithWrongProductId,
  allSalesMock,
  saleByIdMock,
  allSalesDbMock,
  saleByIdDbMock,
  deleteResultMock,
  updateResultMock,
  updatedSaleMock,
}
