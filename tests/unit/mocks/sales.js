const salesMock = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const salesWithoutProductId = [
  {
    "quantity": 5
  }
];

const salesWithoutQuantity = [
  {
      "productId": 1
  }
];

const salesWrongQuantity = [
  {
    "productId": 1,
    "quantity": 0
  }
];

const saleswithWrongProductId = [
  {
    "productId": 9999,
    "quantity": 1
  }
];

const salesSuccessResposeMock = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

module.exports = {
  salesMock,
  salesWithoutProductId,
  salesSuccessResposeMock,
  salesWithoutQuantity,
  salesWrongQuantity,
  saleswithWrongProductId,
}
