const request = require('request');
const { expect } = require('chai');

describe('API Integration Test', () => {
  const URL = 'http://localhost:7865';

  it('GET /', (done) => {
    request.get(URL, (_err, res, body) => {
      expect(res.statusCode).to.be.equal(200);
      expect(body).to.be.equal('Welcome to the payment system');
      done();
    });
  });

  it('GET /cart/:id when it is a valid positive number', (done) => {
    request.get(`${URL}/cart/1`, (err, res, body) => {
      expect(err).to.be.null;
      expect(res.statusCode).to.be.equal(200);
      expect(body).to.be.equal('Payment methods for cart 1');
      done();
    });
  });

  it('GET /cart/:id when it is a negative number', (done) => {
    request.get(`${URL}/cart/-1`, (err, res, _body) => {
      expect(err).to.be.null;
      expect(res.statusCode).to.be.equal(404);
      done();
    });
  });

  it('GET /cart/:id when it is NaN', (done) => {
    request.get(`${URL}/cart/abc`, (err, res, _body) => {
      expect(err).to.be.null;
      expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
});