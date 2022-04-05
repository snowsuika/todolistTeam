const Handle = require('./handle');
const library = require("./library")

const HTTP_STATUS = {
    OK: {
        code: 200,
        message: "OK."
    },
    BAD_REQUEST: {
        cose: 400,
        message: "data not correct or find not todo!"
    },
    NOT_FOUND: {
        code: 404,
        message: "not found."
    },
    SERVER_ERROR: {
        code: 500,
        message: "Internal Server Error."
    }
}

const postTodo = (req, res, todos, body) => {
    try {
        const title = JSON.parse(body).title;
        if (typeof (title) !== 'undefined') {
            const todo = {
                title,
                id: library.uuidv4()
            }
            todos.push(todo);
            Handle.successHandler(res, todos, '資料新增成功');
        } else {
            Handle.errorHandle(res, '資料新增失敗')
        }
    } catch (err) {
        Handle.errorHandle(res, '發生異常錯誤')
    }

}

module.exports = postTodo;