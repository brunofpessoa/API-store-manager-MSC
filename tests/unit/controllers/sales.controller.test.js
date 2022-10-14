const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { salesMock, salesSuccessResposeMock, salesWithoutProductId } = require('../mocks/sales');

describe('Testes do controller de vendas', function () {
  afterEach(sinon.restore);

  describe('Testes da função registerSales', function () {
    it('deve responder o request com status 201 e um objeto com as vendas', async function () {
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

    it('deve responder o request com status 500 e um objeto de erro', async function () {
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
});
