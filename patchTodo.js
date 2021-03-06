const handle = require('./handle');
const Todo = require('./models/todo');

const patchTodo = async (req, res, body) => {
    try {
        const contxt = JSON.parse(body);
        const id = req.url.split('/').pop();
        
        await Todo.findByIdAndUpdate(id,contxt)
        const todos = await Todo.find();
        handle.successHandler(res, todos, '資料更新成功');
    } catch (err) {
        handle.errorHandle(res, `${err.name} + '-' + ${err.message}`);
    }

}


module.exports = patchTodo;