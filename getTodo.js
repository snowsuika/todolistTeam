const handle = require('./handle');

const getTodo = (res, todos) => {
    handle.successHandler(res, todos, '資料讀取成功');
}

module.exports = getTodo;