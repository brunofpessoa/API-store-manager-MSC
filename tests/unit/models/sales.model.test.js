const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesMock } = require('../mocks/sales');

describe('Testes do model de vendas', function () {
  afterEach(sinon.restore);

  describe('Testes da função insert', function () {
    it('deve retornar o id da nova venda cadastrada', async function () {
      const insertId = 9999
      sinon.stub(connection, 'execute').resolves([{ insertId }]);
      const result = await salesModel.insert(salesMock);
      expect(result).to.be.deep.equal(insertId);
    });
  });
});
