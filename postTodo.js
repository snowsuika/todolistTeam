const handle = require('./handle');
const library = require("./library")

const postTodo = (req, res, todos, body) => {
    try {
        const title = JSON.parse(body).title;
        if (typeof (title) !== 'undefined') {
            const todo = {
                title,
                id: library.uuidv4()
            }
            todos.push(todo);
            handle.successHandler(res, todos, '資料新增成功');
        } else {
          handle.errorHandle(res, '資料新增失敗')
        }
    } catch (err) {
      handle.errorHandle(res, '發生異常錯誤')
    }

}

module.exports = postTodo;