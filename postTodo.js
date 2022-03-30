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
            // TODO: 這裡應該改成用 Handle.successHandler
            res.writeHead(HTTP_STATUS.OK.code, library.headers);
            res.write(JSON.stringify({
                'status': HTTP_STATUS.OK.message,
                'data': todos
            }))
            res.end();
        } else {
            Handle.errorHandle(res)
        }
    } catch (err) {
        Handle.errorHandle(res)
    }

}

module.exports = postTodo;