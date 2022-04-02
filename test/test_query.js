const assert = require('chai').assert;
const supertest = require('supertest');
const app = require('../server');

const api = supertest('http://localhost:3005');

describe('Basic test', () => {

    it('API status should be 200', (done) => {
        api.get('/todos').expect(200, done)
    });



    it('The result should be an object with keys', (done) => {
        api.get('/todos')
            .expect(200)
            .end((err, res) => {
                assert.notExists(err);
                assert.hasAllKeys(JSON.parse(res.text), ['status', 'data']);
                done();
            });
    });
});