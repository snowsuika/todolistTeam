const handle = require('./handle');

const patchTodo = (req, res, todos, body) => {
    try {
        const title = JSON.parse(body).title;
        const id = req.url.split('/').pop();
        const index = todos.findIndex(el => el.id === id);
        if (title !== undefined && index !== -1) {
            todos[index].title = title
            handle.successHandler(res, todos, '資料更新成功');
        } else {
            handle.errorHandle(res, '欄位未填寫正確,或查無此 id');
        }
        res.end()
    } catch (err) {
        handle.errorHandle(res, `${err.name} + '-' + ${err.message}`);
    }

}


module.exports = patchTodo;