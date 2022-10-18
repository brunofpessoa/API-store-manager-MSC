const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { allProductsMock, productByIdMock, insertedProductMock } = require('../mocks/products');

describe('Testes do controller de produtos', function () {
  afterEach(sinon.restore);

  describe('Testes da função listProducts', function () {
    it('deve responder o request com status 200 e um array com os produtos', async function () {
      const getAllProductsMock = { type: null, message: allProductsMock };
      sinon.stub(productsService, 'getAllProducts').resolves(getAllProductsMock);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsMock);
    })

    it('deve responder o request com status 500 e um objeto de erro', async function () {
      const message = 'Something went wrong';
      const getAllProductsMock = { type: 'INTERNAL_ERROR', message };
      sinon.stub(productsService, 'getAllProducts').resolves(getAllProductsMock);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({message});
    })
  });

  describe('Testes da função listProductById', function () {
    it('deve responder o request com status 200 e o produto correto', async function () {
      const getProductByIdMock = { type: null, message: productByIdMock };
      sinon.stub(productsService, 'getProductById').resolves(getProductByIdMock);

      const req = { params: { id: 9999 }};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.listProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productByIdMock);
    })

    it('deve responder o request com status 404 e um objeto de produto não encontrado', async function () {
      const message = 'Product not found';
      const getProductByIdMock = { type: 'NOT_FOUND', message };
      sinon.stub(productsService, 'getProductById').resolves(getProductByIdMock);

      const req = { params: { id: 9999 }};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.listProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({message});
    })
  });

  describe('Testes da função registerProduct', function () {
    it('deve responder o request com status 200 e o produto cadastrado', async function () {
      const req = { body: { name: 'product x' } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'addNewProduct')
        .resolves({ type: null, message: insertedProductMock })
    
      await productsController.registerProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(insertedProductMock);
    });

    it('deve responder com um erro caso o serviço de produtos não funcione', async function () {
      const message = 'Something went wrong';
      const req = { body: { name: 'product x' } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'addNewProduct')
        .resolves({ type: 'INTERNAL_ERROR', message })
    
      await productsController.registerProduct(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ message });
    });
  });

  describe('Testes da função updateProduct', function () {
    it('deve responder o request com status 200 e o produto atualizado', async function () {
      const [id, name] = [1, 'product x'];
      const req = { params: { id }, body: { name } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'updateProduct')
        .resolves({ type: null, message: name })
    
      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id, name });
    });

    it('deve responder com um erro caso o serviço de produtos não funcione', async function () {
      const [id, name] = [1, 'product x'];
      const req = { params: { id }, body: { name } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const errorMessage = 'Something went wrong';
      sinon.stub(productsService, 'updateProduct')
        .resolves({ type: 'INTERNAL_ERROR', message: errorMessage })
    
      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ message: errorMessage });
    });
  });

  describe('Testes da função deleteProduct', function () {
    it('deve responder o request com status 204 e nenhum retorno', async function () {
      const id = 1;
      const req = { params: { id } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(productsService, 'deleteProduct')
        .resolves({ type: null, message: null })
    
      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.end).to.have.been.calledOnce;
    });

    it('deve responder com um erro de produto não encontrado', async function () {
      const id = 1;
      const req = { params: { id } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const errorMessage = 'Product not found';
      sinon.stub(productsService, 'deleteProduct')
        .resolves({ type: 'NOT_FOUND', message: errorMessage })
    
      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: errorMessage });
    });
  });

  describe('Testes da função searchByQuery', function () {
    it('deve responder o request com status 200 e um array com o produto', async function () {
      const productMock = [{ id: 1, name: 'Martelo de Thor' }];
      const searchByQueryMock = { type: null, message: productMock };
      sinon.stub(productsService, 'searchByQuery').resolves(searchByQueryMock);

      const req = { query: { q: 'martelo' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.searchByQuery(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productMock);
    });
  });
});
