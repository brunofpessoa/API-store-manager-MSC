const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const {
  salesMock,
  allSalesMock,
  allSalesDbMock,
  saleByIdDbMock,
  saleByIdMock,
  deleteResultMock,
  updateResultMock
} = require('../mocks/sales');

describe('Testes do model de vendas', function () {
  afterEach(sinon.restore);

  describe('Testes da função insert', function () {
    it('deve retornar o id da nova venda cadastrada', async function () {
      const insertId = 9999
      sinon.stub(connection, 'execute').resolves([{ insertId }]);
      const result = await salesModel.insert(salesMock);
      expect(result).to.be.deep.equal(insertId);
    });
  });

  describe('Testes da função findAll', function () {
    it('deve retornar todas as vendas', async function () {
      sinon.stub(connection, 'execute').resolves([allSalesDbMock]);
      const result = await salesModel.findAll();
      expect(result).to.be.deep.equal(allSalesMock);
    });
  });

  describe('Testes da função findById', function () {
    it('deve retornar um venda especificada pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([saleByIdDbMock]);
      const saleId = 1;
      const result = await salesModel.findById(saleId);
      expect(result).to.be.deep.equal(saleByIdMock);
    });
  });

  describe('Testes da função deleteSale', function () {
    it('deve retornar um array com detalhes da remoção', async function () {
      sinon.stub(connection, 'execute').resolves(deleteResultMock);
      const id = 1;
      const result = await salesModel.deleteSale(id);
      expect(result).to.be.equal(deleteResultMock);
    });
  });

  describe('Testes da função update', function () {
    it('deve retornar um array com detalhes da atualização', async function () {
      sinon.stub(connection, 'execute').resolves(updateResultMock);
      const idMock = 1;
      const previousValues = [{
        productId: 1,
        quantity: 11,
      }];
      const newValues = [{
        productId: 1,
        quantity: 1,
      }];
      const result = await salesModel.update(idMock, previousValues, newValues);
      expect(result).to.be.equal(updateResultMock);
    });
  });
});
