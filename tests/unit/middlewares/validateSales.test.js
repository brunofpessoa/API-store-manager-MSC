const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { validateSales } = require('../../../src/middlewares/validateSales');

chai.use(sinonChai);
const { expect } = chai;
const {
  salesMock,
  salesWithoutProductId,
  salesWithoutQuantity,
  salesWrongQuantity,
  saleswithWrongProductId
} = require('../mocks/sales');
const { productsService } = require('../../../src/services');

describe('Testes das validações de registro de vendas', function () {
  afterEach(sinon.restore);

  it('deve retornar status 400 e a mensagem ""productId" is required"', async function () {
    const errorMessage = { message: '"productId" is required' };
    req = { body: salesWithoutProductId };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = sinon.stub().returns();

    await validateSales(req, res, next);
    
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(errorMessage);
  });

  it('deve retornar status 400 e a mensagem ""quantity" is required"', async function () {
    const errorMessage = { message: '"quantity" is required' };
    req = { body: salesWithoutQuantity };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = sinon.stub().returns();

    await validateSales(req, res, next);
    
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(errorMessage);
  });

  it('deve retornar status 422 e a mensagem ""quantity" must be greater than or equal to 1', async function () {
    const errorMessage = { message: '"quantity" must be greater than or equal to 1' };
    req = { body: salesWrongQuantity };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = sinon.stub().returns();

    await validateSales(req, res, next);
    
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(errorMessage);
  });

  it('deve retornar status 404 e a mensagem "Product not found', async function () {
    const errorMessage = { message: 'Product not found' };
    req = { body: saleswithWrongProductId };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = sinon.stub().returns();
    sinon.stub(productsService, 'getProductById').resolves({ type: 'NOT_FOUND', message: 'Product not found' })

    await validateSales(req, res, next);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(errorMessage);
  });

  it('deve chamar a callback "next"', async function () {
    const req = { body: [{ productId: 1, quantity: 1 }] };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = sinon.stub().returns();
    sinon.stub(productsService, 'getProductById').resolves({ type: null })

    await validateSales(req, res, next);

    expect(next).to.have.been.calledOnce;
  });
});