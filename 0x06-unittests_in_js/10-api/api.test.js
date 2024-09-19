const request = require('request');
const { expect } = require('chai');

describe('API Integration Test', () => {
  const URL = 'http://localhost:7865';

  it('GET /', (done) => {
    request.get(URL, (err, res, body) => {
      expect(err).to.be.null;
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

  it('GET /available_payments', (done) => {
    request.get(`${URL}/available_payments`, (err, res, body) => {
      expect(err).to.be.null;
      expect(res.statusCode).to.be.equal(200);
      expect(JSON.parse(body)).to.be.deep.equal({
        payment_methods: { credit_cards: true, paypal: false },
      });
      done();
    });
  });

  it('POST /login', (done) => {
    request.post(
      `${URL}/login`,
      { json: { userName: 'Pinkbrook' } },
      (err, res, body) => {
        expect(err).to.be.null;
        expect(res.statusCode).to.be.equal(200);
        expect(body).to.be.equal('Welcome Pinkbrook');
        done();
      }
    );
  });
});