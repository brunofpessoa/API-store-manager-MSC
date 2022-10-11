const sinon = require('sinon');
const { expect } = require('chai');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { allProductsMock, productByIdMock } = require('../mocks/products');

describe('Testes do serviço de produtos', function () { 
  afterEach(sinon.restore);

  describe('Testes da função getAllProducts', function () {
    it('deve retornar um objeto de erro caso não consiga buscar os produtos', async function () {
      sinon.stub(productsModel, 'findAll').resolves(undefined);
      const expectedValue = { type: 'INTERNAL_ERROR', message: 'Something went wrong' };

      const result = await productsService.getAllProducts();

      expect(result).to.be.deep.equal(expectedValue);
    });
  
    it('deve retornar um objeto com o resultado', async function () {
      const expectedValue = { type: null, message: allProductsMock };
      sinon.stub(productsModel, 'findAll').resolves(allProductsMock);

      const result = await productsService.getAllProducts();

      expect(result).to.be.deep.equal(expectedValue);
    });
  });

  describe('Testes da função getProductById', function () {
    it('deve retornar um objeto com mensagem de produto não encontrado', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);
      const expectedValue = { type: 'NOT_FOUND', message: 'Product not found' };

      const result = await productsService.getProductById();

      expect(result).to.be.deep.equal(expectedValue);
    });
  
    it('deve retornar um objeto com o resultado', async function () {
      const expectedValue = { type: null, message: productByIdMock };
      sinon.stub(productsModel, 'findById').resolves(productByIdMock);

      const result = await productsService.getProductById();

      expect(result).to.be.deep.equal(expectedValue);
    });
  });
});
