const errorHandler = require('./errorHandle');

const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
}

const successHandler = (res, todos) => {
    res.writeHead(200, headers);
    res.write(JSON.stringify({
        "status": "success",
        "message": "刪除成功",
        "data": todos
    }));
    res.end();
}

/** 刪除全部 todos */ 
const deleteAllTodos = (type, res, todos) => {
    todos.length = 0;
    successHandler(res, todos);
}

/** 刪除單筆 todo */
const deleteSingleTodo = (res, todos) => {
    const id = url.split('/').pop();
    const index = todos.findIndex(item => item.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        successHandler(res, todos);
    } else {
        errorHandler(res);
    }
}

module.exports = {
    deleteAllTodos,
    deleteSingleTodo
};