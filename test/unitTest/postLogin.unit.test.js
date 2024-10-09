import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import path from 'path';
import { fileURLToPath } from 'url';


chai.use(chaiHttp);

describe('Integration Tests for POST /login', () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const postLoginPath = path.resolve(__dirname, '../server/router/postLogin.js');

    it('should handle missing credentials', (done) => {
        const req = { body: {} };
        const res = {
            send: (output) => {
                expect(output).to.have.property('ok', false);
                expect(output).to.have.property('error', 'User not found');
                done();
            }
        };

        import(postLoginPath)
            .then((postLoginModule) => {
                const postLogin = postLoginModule.default;
                postLogin(req, res);
            })
            .catch((err) => {
                done(err);
            });
    });
});

