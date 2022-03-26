const errorHandler = require('./errorHandle');

const successHandler = (res, todos) => {
    res.writeHead(200, res.headers);
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
const deleteSingleTodo = (req ,res, todos) => {
    const id = req.url.split('/').pop();
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