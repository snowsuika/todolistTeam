const handle = require('./handle');

/** 刪除全部 todos */
const deleteAllTodos = (res, todos) => {
    todos.length = 0;
    handle.successHandler(res, todos);
}

/** 刪除單筆 todo */
const deleteSingleTodo = (req, res, todos) => {
    const id = req.url.split('/').pop();
    const index = todos.findIndex(item => item.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        handle.successHandler(res, todos, '資料刪除成功');
    } else {
        handle.errorHandle(res, '資料刪除失敗，找不到 id')
    }
}

module.exports = {
    deleteAllTodos,
    deleteSingleTodo
};