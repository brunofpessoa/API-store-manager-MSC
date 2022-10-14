const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { salesMock, salesSuccessResposeMock, salesWithoutProductId, allSalesMock, saleByIdMock } = require('../mocks/sales');

describe('Testes do controller de vendas', function () {
  afterEach(sinon.restore);

  describe('Testes da função registerSales', function () {
    it('deve retornar status 201 e um objeto com as vendas', async function () {
      const salesSuccess = { type: null, message: salesSuccessResposeMock };
      sinon.stub(salesService, 'registerSales').resolves(salesSuccess);

      const req = { body: salesMock };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.registerSales(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(salesSuccessResposeMock);
    });

    it('deve retornar status 500 e um objeto de erro', async function () {
      const salesFailure = { type: 'INTERNAL_ERROR', message: 'Something went wrong' };
      sinon.stub(salesService, 'registerSales').resolves(salesFailure);

      const req = { body: salesMock };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.registerSales(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ message: salesFailure.message });
    });
  });

  describe('Testes da função listSales', function () {
    it('deve retornar status 200 e um array com as vendas', async function () {
      const allSales = { type: null, message: allSalesMock };
      sinon.stub(salesService, 'getAllSales').resolves(allSales);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.listSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSalesMock);
    });

    it('deve retornar status 500 e um mensagem de erro', async function () {
      const errorMessage = { message: 'Something went wrong' };
      const allSales = { type: 'INTERNAL_ERROR', message: 'Something went wrong' };
      sinon.stub(salesService, 'getAllSales').resolves(allSales);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.listSales(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith(errorMessage);
    });
  });

  describe('Testes da função listSaleById', function () {
    it('deve retornar status 200 e um array com a venda especificada', async function () {
      const allSales = { type: null, message: saleByIdMock };
      sinon.stub(salesService, 'getSaleById').resolves(allSales);

      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.listSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleByIdMock);
    });

    it('deve retornar status 404 e uma mensagem de venda não encontrada', async function () {
      const errorMessage = { message: 'Sale not found' };
      const allSales = { type: 'NOT_FOUND', message: 'Sale not found' };
      sinon.stub(salesService, 'getSaleById').resolves(allSales);

      const req = { params: { id: 9999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.listSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(errorMessage);
    });
  });
});
