const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { allProductsMock, productByIdMock } = require('../mocks/products');

describe('Testes do módulo de produtos', function () {
  afterEach(sinon.restore);

  describe('Testes da função findAll', function () {
    it('deve retornar todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([allProductsMock]);
      const result = await productsModel.findAll();
      expect(result).to.be.deep.equal(allProductsMock);
    })
  
    it('deve retornar "undefined" em caso de erro na busca dos produtos', async function () {
      sinon.stub(connection, 'execute').resolves(new Error());
      const result = await productsModel.findAll();
      expect(result).to.be.equal(undefined);
    })
  });

  describe('Testes da função findById', function () {
    it('deve retornar todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([[productByIdMock]]);
      const id = 1;
      const result = await productsModel.findById(id);
      expect(result).to.be.deep.equal(productByIdMock);
    })
  
    it('deve retornar "undefined" em caso de erro na busca do produto', async function () {
      sinon.stub(connection, 'execute').resolves(new Error());
      const id = 1;
      const result = await productsModel.findById(id);
      expect(result).to.be.equal(undefined);
    })
  });
});
