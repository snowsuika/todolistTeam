const assert = require('chai').assert;
const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../server');

// 定義測試的 API 路徑
const api = supertest('http://localhost:3005');

describe('GET /todos 測試', () => {
    it('API 狀態必須 200', (done) => {
        api.get('/todos').expect(200, done)
    });
    it('response.test 必須是物件含有 key : status, data', (done) => {
        api.get('/todos')
            .expect(200)
            .end((err, res) => {
                assert.notExists(err);
                assert.hasAllKeys(JSON.parse(res.text), ['status', 'data']);
                done();
            });
    });
});

describe('POST /todos 測試', () => {
    it('response.body 必須是物件含有 key : status、data, data 內含有 title id, 並且內容吻合', (done) => {
        const postObj = { "title": "新增資料" }
        api.post('/todos')
            .send(postObj)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                assert.notExists(err);
                assert.hasAllKeys(res.body, ['status', 'data']);
                expect(res.body.data).to.be.a('array');
                expect(res.body.data[0]).to.be.a('object');
                assert.hasAllKeys(res.body.data[0], ['title', 'id']);
                assert.equal(res.body.data[0].title, postObj.title);
                expect(res.body.data[0].id).to.be.a('string');
                done();
            });
    });
});