const sinon = require('sinon');
const { expect } = require('chai');

const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { salesMock, salesSuccessResposeMock } = require('../mocks/sales');

describe('Testes do serviço de vendas', function () { 
  afterEach(sinon.restore);

  describe('Testes da função registerSales', function () {
    it('deve retornar um objeto de erro caso não consiga cadastrar um produto', async function () {
      const insertId = undefined;
      sinon.stub(salesModel, 'insert').resolves(insertId);
      const expectedValue = { type: 'INTERNAL_ERROR', message: 'Something went wrong' };

      const result = await salesService.registerSales(salesMock);

      expect(result).to.be.deep.equal(expectedValue);
    });

    it('deve retornar o objeto da venda cadastrada', async function () {
      const insertId = 3;
      sinon.stub(salesModel, 'insert').resolves(insertId);
      const expectedValue = { type: null, message: salesSuccessResposeMock };

      const result = await salesService.registerSales(salesMock);

      expect(result).to.be.deep.equal(expectedValue);
    });
  });
});
