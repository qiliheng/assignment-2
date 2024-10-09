import * as chai from 'chai';
import chaiHttp from 'chai-http';
import postLogin from '../../server/router/postLogin.js'; // Adjust this path as necessary

const { expect } = chai;
chai.use(chaiHttp);

describe('Integration Tests for postLogin', () => {
  
  it('should return error when no credentials are provided', (done) => {
    const req = { body: {} };
    const res = {
      send: (output) => {
        expect(output).to.have.property('ok', false);
        expect(output).to.have.property('error', 'User not found');
        done();
      }
    };

    postLogin(req, res);
  });

  it('should log in successfully with valid username and password', (done) => {
    chai.request('http://localhost:8888')
      .post('/login')
      .send({ username: 'validUsername', pwd: 'validPassword' }) // Use actual credentials for the test
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.property('ok', true);
        expect(res.body).to.have.property('username', 'validUsername'); // Adjust according to response structure
        done();
      });
  });
})
