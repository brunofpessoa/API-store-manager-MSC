const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { allProductsMock, productByIdMock } = require('../mocks/products');

describe('Testes do módulo de produtos', function () {
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
});
