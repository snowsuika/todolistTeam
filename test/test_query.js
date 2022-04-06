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
                assert.hasAllKeys(JSON.parse(res.text), ['status','message', 'data']);
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
                assert.hasAllKeys(res.body, ['status','message', 'data']);
                expect(res.body.data).to.be.a('array');
                expect(res.body.data[0]).to.be.a('object');
                assert.hasAllKeys(res.body.data[0], ['title', 'id']);
                assert.equal(res.body.data[0].title, postObj.title);
                expect(res.body.data[0].id).to.be.a('string');
                done();
            });
    });
});

describe('DELETE /todos 刪除全部 測試', () => {
    let id = "";
    // 刪除前先新增一筆資料
    before((done) => {
        const postObj = { "title": "新增資料" }
        api.post('/todos')
            .send(postObj)
            .expect(200)
            .end((err, res) => {
                // 新增成功取得 id
                id = res.body.data[0].id
                done();
            });
    });

    it('response.body 必須是物件含有 key : status、data, data 長度為 0', (done) => {
        api.delete('/todos')
            .expect(200)
            .end((err, res) => {
                assert.notExists(err);
                assert.hasAllKeys(res.body, ['status','message', 'data']);
                expect(res.body.data).to.be.a('array');
                assert.equal(res.body.data.length, 0);
                done();
            });
    });
});

describe('DELETE /todos 刪除單筆 測試', () => {
    const idArray = [];
    // 刪除前先新增兩筆資料
    before((done) => {
        const postObj = { "title": "新增資料1" }
        api.post('/todos')
            .send(postObj)
            .expect(200)
            .end((err, res) => {
                idArray.push(res.body.data[0].id)
            });
        const postObj2 = { "title": "新增資料2" }
        api.post('/todos')
            .send(postObj2)
            .expect(200)
            .end((err, res) => {
                idArray.push(res.body.data[1].id)
                done();
            });
    });
    it('刪除單筆 response.body  必須是吻合測試條件', (done) => {
        api.delete(`/todos/${idArray[0]}`)
            .expect(200)
            .end((err, res) => {
                assert.notExists(err);
                assert.hasAllKeys(res.body, ['status','message','data']);
                expect(res.body.data).to.be.a('array');
                expect(res.body.data[0]).to.be.a('object');
                assert.hasAllKeys(res.body.data[0], ['title', 'id']);
                // 刪除 idArray[0] 後剩餘 idArray[1]
                assert.equal(res.body.data[0].id, idArray[1]);
                done();
            });
    });
});

describe('PATCH /todos 編輯 測試', () => {
    const idArray = [];
    before((done) => {
        // 先刪除全部
        api.delete('/todos')
            .expect(200)
            .end((err, res) => {
                assert.notExists(err);
                assert.hasAllKeys(res.body, ['status','message', 'data']);
                expect(res.body.data).to.be.a('array');
                assert.equal(res.body.data.length, 0);
            });
        // 新增一筆資料
        const postObj = { "title": "新增資料3" }
        api.post('/todos')
            .send(postObj)
            .expect(200)
            .end((err, res) => {
                idArray.push(res.body.data[0].id)
                done();
            });
    });

    it('response.body 必須是吻合測試條件', (done) => {
        const patchObj = { "title": "修改資料3" }
        api.patch(`/todos/${idArray[0]}`)
            .expect(200)
            .send(patchObj)
            .end((err, res) => {
                assert.notExists(err);
                assert.hasAllKeys(res.body, ['status','message', 'data']);
                expect(res.body.data).to.be.a('array');
                expect(res.body.data[0]).to.be.a('object');
                assert.hasAllKeys(res.body.data[0], ['title', 'id']);
                assert.equal(res.body.data[0].id, idArray[0]);
                assert.equal(res.body.data[0].title, patchObj.title);
                done();
            });
    });
});