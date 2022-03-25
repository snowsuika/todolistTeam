const errorHandle = require('./errorHandle');
const { v4: uuidv4 } = require('uuid');
const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS, DELETE',
    'Content-Type': 'application/json'
}

const httpStatusObj = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    getStatusMessage: function(statusCode){
        const mes = {
            200: "OK.",
            400: "data not correct or find not todo!",
            404: "not found.",
            500: "Internal Server Error."
        }
        return mes[statusCode];
    }
}

const postTodo = (req, res, todos) => {
    let body = '';
    req.on('data' , chunk => {
        body += chunk;
    })

    req.on('end' , () => {
        try {
            const title = JSON.parse(body).title;
            if(typeof(title) !== 'undefined') {
                const todo = {
                    title,
                    id: uuidv4()
                }
                todos.push(todo);
                res.writeHead(httpStatusObj.OK , headers);
                res.write(JSON.stringify({
                    'status': httpStatusObj.getStatusMessage(httpStatusObj.OK),
                    'data': todos
                }))
                res.end();
            } else {
                errorHandle(res)
            }
        } catch(err) {
            errorHandle(res);
        }
    })
}

module.exports = postTodo;