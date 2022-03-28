const http = require('http');
const library = require("./library")
const getTodo = require('./getTodo')
const postTodo = require('./postTodo')
const { deleteAllTodos, deleteSingleTodo } = require('./deleteTodo')
const patchTodo = require('./patchTodo')
const todos = [];

const requestListener = async (req, res) => {
    let body = "";
    req.on('data', chunk => body += chunk)
    await new Promise((resolve) => req.on("end", resolve));
    req['body'] = body

    if (req.url == "/todos" && req.method == "GET") {
        getTodo(res, todos)
    } else if (req.url == "/todos" && req.method == "POST") {
        postTodo(req, res, todos)
    } else if (req.url == "/todos" && req.method == "DELETE") {
        deleteAllTodos(res, todos)
    } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
        deleteSingleTodo(req, res, todos)
    } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
        patchTodo(req, res, todos)
    } else if (req.method == "OPTIONS") {
        res.writeHead(200, library.headers);
        res.end();
    } else {
        res.writeHead(404, library.headers);
        res.write(JSON.stringify({
            "status": "false",
            "message": "無此網站路由"
        }));
        res.end();
    }
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);