const request = require('request');
const chai = require('chai');
const expect = chai.expect;
const app = require('./api');  // Ensure the server is loaded for the test

describe('Index page', () => {
  it('Correct status code?', (done) => {
    request.get('http://localhost:7865', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Correct result?', (done) => {
    request.get('http://localhost:7865', (error, response, body) => {
      expect(body).to.equal('Welcome to the payment system');
      done();
    });
  });

  it('Other?', (done) => {
    request.get('http://localhost:7865', (error, response, body) => {
      expect(response.headers['content-type']).to.contain('text/html');
      done();
    });
  });
});

describe('Cart page', () => {
  it('Correct status code when :id is a number?', (done) => {
    request.get('http://localhost:7865/cart/12', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Correct result when :id is a number?', (done) => {
    request.get('http://localhost:7865/cart/12', (error, response, body) => {
      expect(body).to.equal('Payment methods for cart 12');
      done();
    });
  });

  it('Correct status code when :id is NOT a number?', (done) => {
    request.get('http://localhost:7865/cart/hello', (error, response, body) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  it('Correct result when :id is NOT a number?', (done) => {
    request.get('http://localhost:7865/cart/hello', (error, response, body) => {
      expect(body).to.contain('Cannot GET /cart/hello');
      done();
    });
  });
});
