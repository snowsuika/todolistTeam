const errorHandle = require('./errorHandle');

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

const postTodo = (req, res, todos) => {
    try {
        const title = JSON.parse(req.body).title;
        if (typeof (title) !== 'undefined') {
            const todo = {
                title,
                id: req.uuidv4
            }
            todos.push(todo);
            res.writeHead(HTTP_STATUS.OK.code, res.headers);
            res.write(JSON.stringify({
                'status': HTTP_STATUS.OK.message,
                'data': todos
            }))
            res.end();
        } else {
            errorHandle(res)
        }
    } catch (err) {
        errorHandle(res);
    }

}

module.exports = postTodo;