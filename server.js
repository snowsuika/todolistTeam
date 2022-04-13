const http = require('http');
const mongoose = require('mongoose');
const Todo = require('./models/todo')

const library = require("./library")
const getTodo = require('./getTodo')
const postTodo = require('./postTodo')
const { deleteAllTodos, deleteSingleTodo } = require('./deleteTodo')
const patchTodo = require('./patchTodo')

const dotenv = require('dotenv')
dotenv.config({ path: "./config.env" })
const DB = process.env.DATABASE

mongoose.connect(DB)
    .then(() => {
        console.log('Mongo 連線成功')
    })
    .catch(e => {
        console.log('Mongo 連線失敗', e)
    });


const requestListener = async (req, res) => {
    let body = "";
    req.on('data', chunk => body += chunk)
    await new Promise((resolve) => req.on("end", resolve));
    req['body'] = body

    if (req.url == "/todos" && req.method == "GET") {
        const todos = await Todo.find();
        getTodo(res, todos)
    } else if (req.url == "/todos" && req.method == "POST") {
        postTodo(res, body)
    } else if (req.url == "/todos" && req.method == "DELETE") {
        deleteAllTodos(res)
    } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
        deleteSingleTodo(req, res)
    } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
        patchTodo(req, res, body)
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