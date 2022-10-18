const sinon = require('sinon');
const { expect } = require('chai');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const {
  allProductsMock,
  productByIdMock,
  insertedProductMock,
  deleteResultMock
} = require('../mocks/products');

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

  describe('Testes da função addNewProduct', function () {
    it('deve retornar um objeto com mensagem de erro', async function () {
      sinon.stub(productsModel, 'insert').resolves(undefined);
      const expectedValue = { type: 'INTERNAL_ERROR', message: 'Something went wrong' };

      const result = await productsService.addNewProduct();

      expect(result).to.be.deep.equal(expectedValue);
    });
  
    it('deve retornar corretamento um objeto com o resultado', async function () {
      const insertIdMock = 9999;
      const expectedValue = { type: null, message: insertedProductMock };
      sinon.stub(productsModel, 'insert').resolves(insertIdMock);
      sinon.stub(productsModel, 'findById').resolves(insertedProductMock);

      const product = { name: 'product x' }
      const result = await productsService.addNewProduct(product);

      expect(result).to.be.deep.equal(expectedValue);
    });
  });

  describe('Testes da função updateProduct', function () {
    it('deve retornar um objeto com mensagem de erro', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);
      const expectedValue = { type: 'NOT_FOUND', message: 'Product not found' };

      const result = await productsService.updateProduct();

      expect(result).to.be.deep.equal(expectedValue);
    });

    it('deve retornar um objeto com mensagem de erro', async function () {
      sinon.stub(productsModel, 'findById').resolves(productByIdMock);
      sinon.stub(productsModel, 'update').resolves([{ changedRows: 0 }]);
      const expectedValue = { type: 'INTERNAL_ERROR', message: 'Something went wrong' };

      const result = await productsService.updateProduct();

      expect(result).to.be.deep.equal(expectedValue);
    });
  
    it('deve retornar corretamento um objeto com o resultado', async function () {
      sinon.stub(productsModel, 'findById').resolves(productByIdMock);
      sinon.stub(productsModel, 'update').resolves([{ changedRows: 1 }]);
      const id = 1;
      const name = 'new product name';
      const expectedValue = { type: null, message: name };

      const result = await productsService.updateProduct(id, name);

      expect(result).to.be.deep.equal(expectedValue);
    });
  });

  describe('Testes da função deleteProduct', function () {
    it('deve retornar um objeto com mensagem de erro', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);
      const expectedValue = { type: 'NOT_FOUND', message: 'Product not found' };

      const id = 9999;

      const result = await productsService.deleteProduct(id);

      expect(result).to.be.deep.equal(expectedValue);
    });

    it('deve retornar um objeto com mensagem de erro', async function () {
      sinon.stub(productsModel, 'findById').resolves(productByIdMock);
      sinon.stub(productsModel, 'deleteProduct').resolves([{ affectedRows: 0 }]);
      const expectedValue = { type: 'INTERNAL_ERROR', message: 'Something went wrong' };

      const result = await productsService.deleteProduct();

      expect(result).to.be.deep.equal(expectedValue);
    });
  
    it('deve retornar um objeto com os valores "null"', async function () {
      sinon.stub(productsModel, 'findById').resolves(productByIdMock);
      sinon.stub(productsModel, 'deleteProduct').resolves(deleteResultMock);
      const id = 1;
      const expectedValue = { type: null, message: null };

      const result = await productsService.deleteProduct(id);

      expect(result).to.be.deep.equal(expectedValue);
    });
  });

  describe('Testes da função searchByQuery', function () {
    it('deve retornar todos os produtos caso nenhum produto coincida com a query', async function () {
      sinon.stub(productsModel, 'searchByQuery').resolves([]);
      sinon.stub(productsModel, 'findAll').resolves(allProductsMock);
      const expectedValue = { type: null, message: allProductsMock };
      const query = 'testQuery';

      const result = await productsService.searchByQuery(query);

      expect(result).to.be.deep.equal(expectedValue);
    });
  
    it('deve retornar um objeto com o produto encontrado pela query', async function () {
      const selectedProduct = [{ id: 1, name: 'Martelo de Thor' }];
      sinon.stub(productsModel, 'searchByQuery').resolves(selectedProduct);
      const expectedValue = { type: null, message: selectedProduct };
      const query = 'martelo';

      const result = await productsService.searchByQuery(query);

      expect(result).to.be.deep.equal(expectedValue);
    });
  });
});
