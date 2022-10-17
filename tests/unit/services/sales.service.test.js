const sinon = require('sinon');
const { expect } = require('chai');

const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const {
  salesMock,
  salesSuccessResposeMock,
  allSalesMock,
  saleByIdMock,
  saleByIdDbMock,
  deleteResultMock,
  updatedSaleMock
} = require('../mocks/sales');

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

  describe('Testes da função getAllSales', function () {
    it('deve retornar um objeto de erro caso não consiga buscar as vendas', async function () {
      sinon.stub(salesModel, 'findAll').resolves([]);
      const expectedValue = { type: 'INTERNAL_ERROR', message: 'Something went wrong' };

      const result = await salesService.getAllSales();

      expect(result).to.be.deep.equal(expectedValue);
    });

    it('deve retornar todas as vendas corretamente', async function () {
      sinon.stub(salesModel, 'findAll').resolves(allSalesMock);
      const expectedValue = { type: null, message: allSalesMock };

      const result = await salesService.getAllSales();

      expect(result).to.be.deep.equal(expectedValue);
    });
  });

  describe('Testes da função getSaleById', function () {
    it('deve retornar um erro caso não consiga buscar a venda com o id especificado', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);
      const expectedValue = { type: 'NOT_FOUND', message: 'Sale not found' };
      const id = 9999;

      const result = await salesService.getSaleById(id);

      expect(result).to.be.deep.equal(expectedValue);
    });

    it('deve retornar todas as vendas corretamente', async function () {
      sinon.stub(salesModel, 'findById').resolves(saleByIdMock);
      const expectedValue = { type: null, message: saleByIdMock };
      const id = 1;

      const result = await salesService.getSaleById(id);

      expect(result).to.be.deep.equal(expectedValue);
    });
  });

  describe('Testes da função deleteSale', function () {
    it('deve retornar um objeto com mensagem de erro', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);
      const expectedValue = { type: 'NOT_FOUND', message: 'Sale not found' };

      const id = 9999;

      const result = await salesService.deleteSale(id);

      expect(result).to.be.deep.equal(expectedValue);
    });

    it('deve retornar um objeto com mensagem de erro', async function () {
      sinon.stub(salesModel, 'findById').resolves(saleByIdMock);
      sinon.stub(salesModel, 'deleteSale').resolves([{ affectedRows: 0 }]);
      const expectedValue = { type: 'INTERNAL_ERROR', message: 'Something went wrong' };

      const result = await salesService.deleteSale();

      expect(result).to.be.deep.equal(expectedValue);
    });
  
    it('deve retornar um objeto com os valores "null"', async function () {
      sinon.stub(salesModel, 'findById').resolves(saleByIdMock);
      sinon.stub(salesModel, 'deleteSale').resolves(deleteResultMock);
      const id = 1;
      const expectedValue = { type: null, message: null };

      const result = await salesService.deleteSale(id);

      expect(result).to.be.deep.equal(expectedValue);
    });
  });

  describe('Testes da função update', function () {
    it('deve retornar um objeto com mensagem de erro', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);
      const expectedValue = { type: 'NOT_FOUND', message: 'Sale not found' };

      const result = await salesService.update();

      expect(result).to.be.deep.equal(expectedValue);
    });
  
    it('deve retornar corretamento um objeto com o resultado', async function () {
      sinon.stub(salesModel, 'findById').resolves(updatedSaleMock);
      sinon.stub(salesModel, 'update').resolves([{ changedRows: 1 }]);
      const id = 1;
      const newValues = updatedSaleMock;
      const expectedValue = { type: null, message: updatedSaleMock };

      const result = await salesService.update(id, newValues);

      expect(result).to.be.deep.equal(expectedValue);
    });
  });
});
