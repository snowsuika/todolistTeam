const http = require('http');
const { v4: uuidv4 } = require('uuid');
const errHandle = require('./errorHandle');
const getTodo = require('./getTodo')
const postTodo = require('./postTodo')
const { deleteAllTodos, deleteSingleTodo } = require('./deleteTodo')
const todos = [];

const requestListener = async (req, res) => {
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json'
    }
    let body = "";
    req.on('data', chunk => body += chunk)
    await new Promise((resolve) => req.on("end", resolve));
    req['body'] = body
    req['uuidv4'] = uuidv4()
    res['headers'] = headers

    if (req.url == "/todos" && req.method == "GET") {
        getTodo(res, todos)
    } else if (req.url == "/todos" && req.method == "POST") {
        postTodo(req, res, todos)
    } else if (req.url == "/todos" && req.method == "DELETE") {
        deleteAllTodos('type', res, todos)
    } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
        //deleteSingleTodo(res, todos)
    } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
        // patchTodo.js
    } else if (req.method == "OPTIONS") {
        res.writeHead(200, headers);
        res.end();
    } else {
        res.writeHead(404, headers);
        res.write(JSON.stringify({
            "status": "false",
            "message": "無此網站路由"
        }));
        res.end();
    }
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);