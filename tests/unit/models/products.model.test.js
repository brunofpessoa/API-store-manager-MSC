const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { allProductsMock, productByIdMock, updateResultMock, deleteResultMock } = require('../mocks/products');

describe('Testes do model de produtos', function () {
  afterEach(sinon.restore);

  describe('Testes da função findAll', function () {
    it('deve retornar todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([allProductsMock]);
      const result = await productsModel.findAll();
      expect(result).to.be.deep.equal(allProductsMock);
    });
  });

  describe('Testes da função findById', function () {
    it('deve retornar todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([[productByIdMock]]);
      const id = 1;
      const result = await productsModel.findById(id);
      expect(result).to.be.deep.equal(productByIdMock);
    });
  });

  describe('Testes da função insert', function () {
    it('deve retornar o insertId', async function () {
      const insertIdMock = 99999;
      sinon.stub(connection, 'execute').resolves([{ insertId: insertIdMock }]);
      const productName = 'product x';
      const insertId = await productsModel.insert(productName);
      expect(insertId).to.be.deep.equal(insertIdMock);
    });
  });

  describe('Testes da função update', function () {
    it('deve retornar um array com detalhes da atualização', async function () {
      sinon.stub(connection, 'execute').resolves(updateResultMock);
      const id = 1;
      const name = 'product x';
      const result = await productsModel.update(id, name);
      expect(result).to.be.equal(updateResultMock);
    });
  });

  describe('Testes da função deleteProduct', function () {
    it('deve retornar um array com detalhes da remoção', async function () {
      sinon.stub(connection, 'execute').resolves(deleteResultMock);
      const id = 1;
      const result = await productsModel.deleteProduct(id);
      expect(result).to.be.equal(deleteResultMock);
    });
  });

  describe('Testes da função searchByQuery', function () {
    it('deve retornar todos os produtos que correspondem à pesquisa', async function () {
      const expectedValue = [{ id: 1, name: 'Martelo de Thor' }];
      sinon.stub(connection, 'execute').resolves([expectedValue]);
      const query = 'martelo';
      const result = await productsModel.searchByQuery(query);
      expect(result).to.be.deep.equal(expectedValue);
    });
  });
});
