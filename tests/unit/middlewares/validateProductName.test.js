const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const { validateProductName } = require('../../../src/middlewares/validateProductName');

describe('Testes da validação de nome de produto', function () {
  it('deve responder o request com status 404 e um erro de validação', async function () {
    const errorMessage = { message: '"name" is required' }
    const req = { body: {} };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateProductName(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(errorMessage);
  });

  it('deve responder o request com status 422 e um erro de validação', async function () {
    const errorMessage = { message: '"name" length must be at least 5 characters long' }
    const req = { body: { name: 'shrt'} };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateProductName(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(errorMessage);
  });

  it('deve chamar a função "next"', async function () {
    const req = { body: { name: 'validName'} };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = sinon.stub().returns();

    await validateProductName(req, res, next);

    expect(next).to.have.been.calledOnce;
  });
});



